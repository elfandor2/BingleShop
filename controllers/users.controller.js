const { User } = require("../db/models")
const ErrorResponse = require("../helpers/error.helper")
const bcrypt = require('bcryptjs')
const Response = require("../helpers/response.helper")
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');

class UsersController {
    async registerUser(req, res, next) {
        try {
            const { full_name, email, phone, address, password } = req.body
            const isEmailExist = await User.findOne({ where: { email: email, }, })
            if (isEmailExist) {
                throw new ErrorResponse(400, "Email sudah terdaftar!")
            }

            const hashPassword = await bcrypt.hash(password, 4)
            const user = await User.create({
                email,
                password: hashPassword,
                full_name,
                phone,
                address,
                role: "user",
                email_token: crypto.randomBytes(64).toString('hex'),
                email_verified: false,
            })

            // nodemailer
            const config = {
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD,
                }
            };
            const transporter = nodemailer.createTransport(config);

            const mailOption = ({
                from: `"Verify your email" <${process.env.EMAIL}>`,
                to: email,
                subject: "Verify your email ✔",
                text: "Hello world?",
                html: `<h2> Terima kasih ${full_name} sudah mendaftar, </h2>
                <h4>Silahkan verifikasi email kamu sebelum belanja ...</h4>
                <a href="http://${req.headers.host}/v1/user/verify-email?token=${user.email_token}" >Verifikasi emailmu!</a>`,
            })

            // let MailGenerator = new Mailgen({
            //     theme: "default",
            //     product: {
            //         name: "BingleShop",
            //         link: "https://bingleshop.js/"
            //     }
            // })

            // let response = {
            //     body: {
            //         name: full_name,
            //         intro: "Selamat bergabung. Nikmati pengalaman belanja di BingleShop!",
            //         action: {
            //             instructions: 'Mulai belanja setelah konfirmasi akunmu',
            //             button: {
            //                 color: '#22BC66', // Optional action button color
            //                 text: 'Konfirmasi Akun',
            //                 link: 'https://mailgen.js/confirm?s=d9729feb74992cc3482b350163a1a010'
            //             }
            //         },
            //     }
            // }

            // let mail = MailGenerator.generate(response)

            // let message = {
            //     from: process.env.EMAIL,
            //     to: email,
            //     subject: "Register akun",
            //     html: mail
            // }

            await transporter.sendMail(mailOption).then(() => {
                // return res.status(201).json({
                //     msg: "You should receive an email"
                // })
                next();
            })
                .catch(error => {
                    return res.status(500).json({ error })
                })

            return new Response(res, 200, 'Akun berhasil didaftarkan, Verifikasi emailmu terlebih dahulu')
        } catch (error) {
            next(error)
        }
    }

    async registerAdmin(req, res, next) {
        try {
            const { full_name, email, phone, address, password } = req.body
            const isEmailExist = await User.findOne({ where: { email: email, }, })
            if (isEmailExist) {
                throw new ErrorResponse(400, "Email sudah terdaftar!")
            }

            const hashPassword = await bcrypt.hash(password, 4)
            const user = await User.create({
                email,
                password: hashPassword,
                full_name,
                phone,
                address,
                role: "admin",
                email_token: crypto.randomBytes(64).toString('hex'),
                email_verified: false,
            })

            // nodemailer
            const config = {
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD,
                }
            };
            const transporter = nodemailer.createTransport(config);

            const mailOption = ({
                from: `"Verify your email" <${process.env.EMAIL}>`,
                to: email,
                subject: "Verify your email ✔",
                text: "Hello world?",
                html: `<h2> Terima kasih ${full_name} sudah mendaftar, </h2>
                <h4>Silahkan verifikasi email kamu sebelum belanja ...</h4>
                <a href="http://${req.headers.host}/v1/user/verify-email?token=${user.email_token}" >Verifikasi emailmu!</a>`,
            })

            // let MailGenerator = new Mailgen({
            //     theme: "default",
            //     product: {
            //         name: "BingleShop",
            //         link: "https://bingleshop.js/"
            //     }
            // })

            // let response = {
            //     body: {
            //         name: full_name,
            //         intro: "Selamat bergabung. Nikmati pengalaman belanja di BingleShop!",
            //         action: {
            //             instructions: 'Mulai belanja setelah konfirmasi akunmu',
            //             button: {
            //                 color: '#22BC66', // Optional action button color
            //                 text: 'Konfirmasi Akun',
            //                 link: 'https://mailgen.js/confirm?s=d9729feb74992cc3482b350163a1a010'
            //             }
            //         },
            //     }
            // }

            // let mail = MailGenerator.generate(response)

            // let message = {
            //     from: process.env.EMAIL,
            //     to: email,
            //     subject: "Register akun",
            //     html: mail
            // }

            await transporter.sendMail(mailOption).then(() => {
                // return res.status(201).json({
                //     msg: "You should receive an email"
                // })
                next();
            })
                .catch(error => {
                    return res.status(500).json({ error })
                })

            return new Response(res, 200, 'Akun berhasil didaftarkan, Verifikasi emailmu terlebih dahulu')
        } catch (error) {
            next(error)
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body
            const isEmailExist = await User.findOne({
                where: { email },
                attributes: ["password", "id", "email_verified", "role"]
            })
            if (!isEmailExist) {
                throw new ErrorResponse(400, "Email tidak terdaftar")
            };
            const checkPassword = await bcrypt.compare(password, isEmailExist.password)
            if (!checkPassword) {
                throw new ErrorResponse(400, "Password salah!")
            }
            if (isEmailExist.email_verified) {
                next()
            } else {
                throw new ErrorResponse(400, "Email tidak terdaftar")
            };

            const jwtPayload = {
                user_id: isEmailExist.id,
                role: isEmailExist.role
            }
            const accessToken = jwt.sign(jwtPayload, process.env.JWT_KEY, { expiresIn: '7h' })

            return new Response(res, 201, { accessToken })
        } catch (error) {
            next(error)
        }
    }

    async verifyEmail(req, res, next) {
        try {
            const token = req.query.token
            const user = await User.findOne({
                where: {
                    email_token: token
                },
                attributes: ["email_token", "email_verified"]
            })

            if (user) {
                const user = await User.update({
                    email_token: null,
                    email_verified: true
                },
                    { where: { email_token: token } },)
            }

            return new Response(res, 201, "Email telah terverifikasi!")
        } catch (error) {
            next(error)
        }
    }
}

module.exports = { UsersController }