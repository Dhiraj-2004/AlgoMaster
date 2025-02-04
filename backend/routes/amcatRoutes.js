const express = require('express');
const router = express.Router();
const { getUserByAmcatID } = require('../controllers/amcatController'); // Import controller

// Define route
router.get('/user', getUserByAmcatID); // API: /api/amcat/user?amcatID=432008838000179

module.exports = router;
