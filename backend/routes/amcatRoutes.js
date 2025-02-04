const express = require('express');
const router = express.Router();
const { getUserByAmcatID, getUserRankByScores } = require('../controllers/amcatController');

// Define route
router.get('/user', getUserByAmcatID); // API: /api/amcat/user?amcatID=432008838000179
router.get('/user/rank/:amcatID', getUserRankByScores);


module.exports = router;
