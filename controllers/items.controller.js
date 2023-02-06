const Response = require('../helpers/response.helper');
const ErrorResponse = require('../helpers/error.helper');
const { Item } = require('../db/models');
const jwt_decode = require('jwt-decode');
const jwt = require(`jsonwebtoken`);
const { User } = require('../db/models')



class ItemsController {
    async getItems(req, res, next) {
        try {
            const data = await Item.findAll({
                attributes: ['id', 'name', 'price', 'stock', 'sku'],
                include: [{
                    model: User,
                    as: 'user',
                    attributes: ['id', 'full_name', 'email']
                }]
            })
            if (data.length === 0) {
                throw new ErrorResponse(400, 'Barang tidak ditemukan')
            }
            return new Response(res, 200, data)
        } catch (error) {
            next(error)
        }
    }

    async insertItem(req, res, next) {
        try {
            const code = req.header('code');
            const decode = jwt_decode(code);
            console.log(decode);
            const data = {
                name: req.body.name,
                price: req.body.price,
                stock: req.body.stock,
                sku: req.body.sku,
                user_id: decode.user_id
            }
            const result = await Item.create(data)
            return new Response(res, 200, 'Data item berhasil ditambahkan!')
        } catch (error) {
            next(error)
        }
    }

    async updateItem(req, res, next) {
        try {
            const id = req.params.id
            const itemsById = await Item.findOne({
                where: {
                    id
                }
            })
            if (!itemsById) {
                throw new ErrorResponse(400, "Data item tidak tersedia")
            }
            const { name, price, stock, sku, } = req.body
            const newItem = await Item.update(
                {
                    name,
                    price,
                    stock,
                    sku
                },
                {
                    where: {
                        id: id
                    }
                },
            )
            if (newItem.length === 0) {
                throw new ErrorResponse(400, 'Data tidak ditemukan')
            }
            return new Response(res, 200, 'Data item berhasil diperbarui')
        } catch (error) {
            next(error)
        }
    }

    async deleteItem(req, res, next) {
        try {
            const id = req.params.id
            const data = await Item.destroy({
                where: { id: id },
            })
            if (!data) {
                throw new ErrorResponse(400, 'Data tidak ditemukan')
            }
            return new Response(res, 200, "Data berhasil dihapus")
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    ItemsController
}