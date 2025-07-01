const express = require('express')
const router = express.router()
const { body } = require('express-validator')


router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email!'),
    body('fullName.firstName').isLength({ min: 3 }).withMessage('First Name must be at least 3 characters long!'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long!')
])


module.exports = router