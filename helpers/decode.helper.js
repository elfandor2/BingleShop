const jwt = require('jsonwebtoken');
const ErrorResponse = require('./error.helper');
const verifyToken = (req, res, next) => {
    // const token = req.body.authToken
    const token = req.header('token');
    if (!token) {
        throw {
            code: 400,
            message: "Silahkan Login"
        }
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_KEY)
        next()
    } catch (error) {
        next(error)
    }
}

const loginAuth = (req, res, next) => {
    const code = req.header('code');
    if (!code) {
        // throw {
        //     code: 400,
        //     message: "Login terlebih dahulu"
        // }
        throw new ErrorResponse(403, "Login terlebih dahulu")
    }
    try {
        const verifiedCode = jwt.verify(code, process.env.JWT_KEY)
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = loginAuth