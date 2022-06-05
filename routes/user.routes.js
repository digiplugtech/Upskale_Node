const express = require('express')

const UserCtrl = require('../controllers/user.controller');
const {createUser, getAllUser, getUserById, updateUserById, getUserDetails, verifyUser, removeUser, getPassword} = UserCtrl
const router = express.Router()

router.post('/users', createUser) // Inserting user information.
router.get('/users', getAllUser) // Get all users.
router.get('/user/:id', getUserById) // Getting Individual user information.
router.put('/user/:id', updateUserById) // Updating Individual user information.
router.post('/usersdetails', getUserDetails) // Verifying and Getting All user details.
router.post('/verifyusers', verifyUser) // Getting All user details.
router.delete('/users', removeUser); // Remove single user.
router.post('/users/forget', getPassword) // Getting forget user information

router.post('/usermail', sendMail); // Test mail sending.........
module.exports = router;