const ErrorResponse = require("../helpers/error.helper")
const jwt_decode = require('jwt-decode');

const authorization = (role) => {
    return (req, res, next) => {

        const code = req.header('code');
        const decoded = jwt_decode(code);
        const userRole = decoded.role

        if (userRole === role) {
            next()
        } else {
            throw new ErrorResponse(401, "Kamu tidak memiliki otorisasi untuk ini!")
        }
    }
}
module.exports = {
    authorization
}