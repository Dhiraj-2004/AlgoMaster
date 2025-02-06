const axios = require('axios');
const User = require("../models/userModel");
const cron = require("node-cron");
const { use } = require('../routes/userRoutes');

const LEETCODE_GRAPHQL_URL = 'https://leetcode.com/graphql/';
const HEADERS = {
    'x-csrftoken': process.env.LEETCODE_CSRF_TOKEN,
    'cookie': process.env.LEETCODE_COOKIE,
    'content-type': 'application/json',
};

// updating rank
const updateUserData = async (platformUser, username) => {
    const apiEndpoint = getPlatformApiEndpoint(platformUser);

    try {
        let rank;
        let userData;

        if (platformUser === "leetcodeUser") {
            userData = await fetchLeetCodeData(username);
            rank = getRank(userData, platformUser);
        } else {
            const response = await axios.get(`${apiEndpoint}/${username}`);
            rank = getRank(response.data, platformUser);
        }

        const rankFieldMap = {
            leetcodeUser: "ranks.leetcodeRank",
            codechefUser: "ranks.codechefRank",
            codeforcesUser: "ranks.codeforcesRank",
        };
        const rankField = rankFieldMap[platformUser];

        const updatedUser = await User.findOneAndUpdate(
            { [`usernames.${platformUser}`]: username },
            { [rankField]: rank },
            { new: true }
        );

    } catch (error) {
        console.error(`Error updating ${platformUser} data for ${username}:`, error.message);
    }
};

// api for update rank
const getPlatformApiEndpoint = (platformUser) => {
    switch (platformUser) {
        case "leetcodeUser":
            return null;
        case "codechefUser":
            return process.env.CODECHEF;
        case "codeforcesUser":
            return process.env.CODEFORCES;
        default:
            throw new Error("Unknown platform");
    }
};

// leetcode rank get
const fetchLeetCodeData = async (username) => {
    const query = `
    query getUserProfile($username: String!) {
        userContestRanking(username: $username) {
            rating
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
        return response.data;
    } catch (error) {
        console.error('Error fetching data from LeetCode:', error.message);
        throw new Error('Failed to fetch data from LeetCode');
    }
};

// get rank from api
const getRank = (userData, platformUser) => {
    switch (platformUser) {
        case "leetcodeUser":
            const leetcodeRating = userData?.data?.userContestRanking?.rating;
            return leetcodeRating ? Math.round(leetcodeRating) : 0;
        case "codechefUser":
            const latestRating = userData?.currentRating;
            return latestRating ? Math.round(latestRating) : Math.round(userData?.currentRating);
        case "codeforcesUser":
            const codeforcesRating = userData?.result?.[0]?.rating;
            return codeforcesRating ? Math.round(codeforcesRating) : 0;
        default:
            return 0;
    }
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// schedule data update every saturday
cron.schedule("0 0 * * 6", async () => {
    console.log(`Cron job started at ${new Date().toISOString()}`);

    const users = await User.find({});

    for (const user of users) {
        const { usernames } = user;

        if (usernames.leetcodeUser) {
            await updateUserData("leetcodeUser", usernames.leetcodeUser);
            await delay(2000);
        }
        if (usernames.codechefUser) {
            await updateUserData("codechefUser", usernames.codechefUser);
            await delay(2000);
        }
        if (usernames.codeforcesUser) {
            await updateUserData("codeforcesUser", usernames.codeforcesUser);
            await delay(2000);
        }
    }

    console.log(`Cron job completed at ${new Date().toISOString()}`);
});
