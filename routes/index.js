const express = require('express');
const router = express.Router();
const userRoutes = require('../users');

// Use individual route modules
router.use(userRoutes);

module.exports = router;