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
    }
  `;

    const variables = { username };

    try {
        const response = await axios.post(
            LEETCODE_GRAPHQL_URL,
            { query, variables },
            { headers: HEADERS }
        );
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data from LeetCode:', error.message);
        res.status(500).json({ error: 'Failed to fetch data from LeetCode' });
    }
};