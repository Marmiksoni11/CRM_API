const express = require('express');
const router = express.Router();
const userRoutes = require('../user');
const {
    createUser,
    loginUser,
    logoutUser,
    getToken
} = require('../user/controller');
const auth = require("../middleware/authentication");

router.route('/register').post(createUser)
router.route('/token').post(getToken)
router.route('/login').post(loginUser)
router.route('/logout').put(logoutUser)

// Authenticate All routes other then Authentication system routes above
router.use(auth)

router.use(userRoutes);

module.exports = router;