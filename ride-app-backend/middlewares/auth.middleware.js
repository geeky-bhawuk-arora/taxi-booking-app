const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userModel = require('../models/user.model')

module.exports.authUser = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = req.cookies?.token || (authHeader && authHeader.split(' ')[1]);
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized!' })
    }

    const isBlacklisted = await userModel.findOne({ token: token })

    if(isBlacklisted) {
        res.status(401).json({ message: 'Unauthorized!'})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findById(decoded._id)
        req.user = user
        return next()
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized!' })
    }

}