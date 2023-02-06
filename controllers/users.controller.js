const { User } = require("../db/models")
const ErrorResponse = require("../helpers/error.helper")
const bcrypt = require('bcryptjs')
const Response = require("../helpers/response.helper")
const jwt = require('jsonwebtoken');

class UsersController {
    async register(req, res, next) {
        try {
            const { full_name, email, phone, address, password } = req.body
            const isEmailExist = await User.findOne({
                where: {
                    email: email,
                },
            })
            if (isEmailExist) {
                throw new ErrorResponse(400, "Email sudah terdaftar!")
            }

            const hashPassword = await bcrypt.hash(password, 4)
            const user = await User.create({
                email,
                password: hashPassword,
                full_name,
                phone,
                address
            })
            return new Response(res, 200, 'Akun berhasil didaftarkan')
        } catch (error) {
            next(error)
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body
            const isEmailExist = await User.findOne({
                where: {
                    email
                },
                attributes: ["password", "id"]
            })
            if (!isEmailExist) {
                throw new ErrorResponse(400, "Email tidak terdaftar")
            };
            const checkPassword = await bcrypt.compare(password, isEmailExist.password)
            if (!checkPassword) {
                throw new ErrorResponse(400, "Password salah!")
            }

            const jwtPayload = {
                user_id: isEmailExist.id
            }
            const accessToken = jwt.sign(jwtPayload, process.env.JWT_KEY, { expiresIn: '7h' })

            return new Response(res, 201, { accessToken })
        } catch (error) {
            next(error)
        }
    }

    deleteUser(req, res, next) {

    }
}

module.exports = { UsersController }