const express = require('express')
const userControllers = require('../controllers/user-controllers');

const router = express.Router()

router.post('/register' , userControllers.register)
router.post('/login' , userControllers.login)
router.get('/user-profile' , userControllers.userProfie)


module.exports = router