const { Item } = require('../db/models');
const jwt_decode = require('jwt-decode');
const Response = require('../helpers/response.helper');
const { Order, User } = require('../db/models');
const { OrderItems } = require('../db/models');
const ErrorResponse = require('../helpers/error.helper');
const { body } = require('express-validator');

class OrdersController {
    async getOrders(req, res, next) {
        try {
            const code = req.header('code');
            const decode = jwt_decode(code);
            console.log(decode);
            const isOrderExist = await Order.findAll({
                where: {
                    user_id: decode.user_id,
                },
                attributes: ['total', 'status', 'id', 'user_id'],
                include: [{
                    model: User,
                    as: 'user',
                    attributes: ['full_name', 'email']
                }]
            })
            console.log(isOrderExist.id);
            if (isOrderExist.length === 0) {
                throw new ErrorResponse(400, "Data order masih kosong")
            }
            return new Response(res, 200, isOrderExist)
        } catch (error) {
            next(error)
        }
    }

    async CreateOrder(req, res, next) {
        try {
            const code = req.header('code');
            const decode = jwt_decode(code);
            const data = req.body.data
            var orderItems = []
            for (const d of data) {
                const item = await Item.findOne({
                    where: {
                        name: d.item_name
                    },
                    attributes: ['id', 'price', 'name']
                })
                if (item === null) {
                    throw new ErrorResponse(400, "Barang tersebut tidak tersedia")
                }
                if (d.quantity < 1) {
                    throw new ErrorResponse(400, "Masukkan jumlah barang yang diinginkan")
                }

                let order = await Order.findOne({
                    where: {
                        user_id: decode.user_id,
                        status: "Pending"
                    },
                })

                if (!order) {
                    order = await Order.create({
                        user_id: decode.user_id,
                        status: "Pending",
                        total: d.quantity * item.price
                    })
                }
                console.log(order.dataValues.id);
                const orderItem = {
                    quantity: d.quantity,
                    price: item.price,
                    item_id: item.id,
                    order_id: order.dataValues.id
                }

                orderItems.push(orderItem)
            }
            console.log(orderItems);
            const resultOrder = await OrderItems.bulkCreate(
                orderItems
            )
            return new Response(res, 200, resultOrder)

        } catch (error) {
            next(error)
        }
    }

    async PayOrder(req, res, next) {
        try {
            const code = req.header('code');
            const decode = jwt_decode(code);
            const id = req.params.id
            const orderExist = await Order.findOne({
                where: {
                    user_id: decode.user_id,
                    id: id
                },
                attributes: ['total', 'status']
            })
            if (!orderExist) {
                console.log(orderExist);
                throw new ErrorResponse(400, "Data orderan yang kamu cari tidak ada")
            }
            if (orderExist.status === 'Paid') {
                return new Response(res, 200, "Orderan sudah dibayar Kemaren")
            }
            const updatedata = await Order.update({
                status: 'Paid'
            }, {
                where: {
                    user_id: decode.user_id,
                }
            })
            return new Response(res, 200, "Orderan sudah dibayar")
        }
        catch (error) {
            next(error)
        }
    }

}
module.exports = {
    OrdersController
}