const bcrypt = require('bcryptjs');

const { validationResult } = require('express-validator')
const userModel = require('../models/user.model')
const userService = require('../services/user.service')

module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { fullName, email, password } = req.body

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userService.createUser({
        firstName: fullName.firstName,
        lastName: fullName.lastName,
        email,
        password: hashPassword
    })

    const token = user.generateAuthToken()

    res.status(201).json({ token, user })
}