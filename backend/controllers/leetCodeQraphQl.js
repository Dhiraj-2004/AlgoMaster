const axios = require('axios');

const LEETCODE_GRAPHQL_URL = 'https://leetcode.com/graphql/';
const HEADERS = {
    'x-csrftoken': process.env.LEETCODE_CSRF_TOKEN,
    'cookie': process.env.LEETCODE_COOKIE,
    'content-type': 'application/json',
}

exports.leetCode = async (req, res) => {
    const username = req.params.username;
    const query = `
    query getUserProfile($username: String!) {
      matchedUser(username: $username) {
        username
        submitStats {
          acSubmissionNum {
            difficulty
            count
          }
        }
      }
      userContestRanking(username: $username) {
        rating
        globalRanking
        totalParticipants
        topPercentage
      }
      allQuestionsCount {
        difficulty
        count
      }
      userContestRankingHistory(username: $username) {
        contest {
          title
          startTime
        }
        attended
        problemsSolved
        totalProblems
        finishTimeInSeconds
        rating
        ranking
        trendDirection
      }
    }
  `;

    const variables = { username };

    try {
        const response = await axios.post(
            LEETCODE_GRAPHQL_URL,
            { query, variables },
            { headers: HEADERS }
        );

        const data = response.data?.data;

        if (!data) {
            return res.status(500).json({ error: 'Invalid response from LeetCode' });
        }

        // Extract matched user details
        const matchedUser = data?.matchedUser || { username: 'Unknown', submitStats: { acSubmissionNum: [] } };

        // Extract allQuestionsCount
        const allQuestionsCount = data?.allQuestionsCount || [];

        // Extract user contest ranking
        const userContestRanking = {
            rating: data?.userContestRanking?.rating ?? null,
            globalRanking: data?.userContestRanking?.globalRanking ?? null,
            totalParticipants: data?.userContestRanking?.totalParticipants ?? null,
            topPercentage: data?.userContestRanking?.topPercentage ?? null
        };

        // Filter attended contests
        const attendedContests = data?.userContestRankingHistory
            ?.filter(contest => contest.attended)
            ?.map(contest => ({
                contestTitle: contest?.contest?.title ?? 'Unknown',
                startTime: contest?.contest?.startTime ?? null,
                problemsSolved: contest?.problemsSolved ?? 0,
                totalProblems: contest?.totalProblems ?? 0,
                finishTimeInSeconds: contest?.finishTimeInSeconds ?? 0,
                rating: contest?.rating ?? null,
                ranking: contest?.ranking ?? null,
                trendDirection: contest?.trendDirection ?? 'UNKNOWN'
            })) || [];

        // Construct final response
        const result = {
            data: {
                matchedUser,
                userContestRanking,
                allQuestionsCount,
                attendedContests
            }
        };

        res.json(result);
    } catch (error) {
        console.error('Error fetching data from LeetCode:', error.message);
        res.status(500).json({ error: 'Failed to fetch data from LeetCode' });
    }
};
