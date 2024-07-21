const { 
    getUser,
    createUser, 
    updateUser,
    deleteUser
} = require('./controller');
const express = require('express')
const router = express.Router()

// router.route('/user').post(createJob).get(getAllJobs)
// router.route('/:id').get(getJob).delete(deleteJob).patch(updateJob)

router.route('/user').get(getUser).post(createUser)

router.route('/user/:id').put(updateUser).delete(deleteUser)


module.exports = router

