const express = require('express');

const app = express();
const itemRouter = require('./routers/items.router');
const userRouter = require('./routers/users.router');
const orderRouter = require('./routers/orders.router');


app.use(express.json())

app.use('/v1', userRouter)
app.use('/v1', itemRouter)
app.use('/v1', orderRouter)


app.use((err, req, res, next) => {
    console.log(err);

    return res.status(err.status || 500).json({
        status: false,
        data: {},
        message: err.message || err
    })
})


module.exports = app