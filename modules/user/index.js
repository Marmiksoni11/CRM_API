const { 
    getUser,
    updateUser,
    deleteUser,
} = require('./controller');
const express = require('express')
const router = express.Router()

router.route('/user').get(getUser)
router.route('/user/:id').put(updateUser).delete(deleteUser)

module.exports = router

