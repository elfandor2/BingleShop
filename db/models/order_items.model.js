const { Model, DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

class OrderItem extends Model {

}

OrderItem.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        quantity: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: true,
        },
        item_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        order_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    },
    {
        sequelize: sequelize,
        timestamps: true,
        paranoid: true,
        underscored: true,
        deletedAt: 'deleted_at',
        updatedAt: 'updated_at',
        createdAt: 'created_at'
    },
)

module.exports = OrderItem