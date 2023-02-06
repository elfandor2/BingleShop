const express = require('express');
const { check, validationResult } = require('express-validator');

const rulesRegister = [
    check('full_name').notEmpty().isString(),
    check('email').notEmpty().isString().isEmail(),
    check('password').notEmpty().isString().isLength({ min: 8 }).withMessage('must be at least 8 chars long')
]
const rulesLogin = [
    check('email').notEmpty().isString().isEmail(),
    check('password').notEmpty().isString().isLength({ min: 8 }).withMessage('must be at least 8 chars long')
]

const validationUser = [
    rulesRegister,
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(404).json({
                errors: errors.array()
            })
        }
        next()
    }
]

const validationLogin = [
    rulesLogin,
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(404).json({
                errors: errors.array()
            })
        }
        next()
    }
]

module.exports = {
    validationUser,
    validationLogin
}