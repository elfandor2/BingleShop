const express = require('express');
var crypto = require('crypto');

const app = express();
const itemRouter = require('./routers/items.router');
const userRouter = require('./routers/users.router');
const orderRouter = require('./routers/orders.router');


app.use(express.json())

app.use('/v1', userRouter)
app.use('/v1', itemRouter)
app.use('/v1', orderRouter)
app.get('/tes', (req, res) => {
    res.status(200).json(crypto.randomBytes(64).toString('hex'))
    console.log(req.headers.host);
})

app.use((err, req, res, next) => {

    return res.status(err.status || 500).json({
        status: false,
        data: {},
        message: err.message || err
    })
})


module.exports = app