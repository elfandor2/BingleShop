const User = require('./users.model');
const Item = require('./items.model');
const Order = require('./orders.model');
const OrderItems = require('./order_items.model');
const sequelize = require('sequelize');

Item.belongsTo(User, { as: 'user', foreignKey: 'user_id' })
User.hasMany(Item, { as: 'items' })
User.hasMany(Order, {
  as: 'orders',
  foreignKey: 'user_id'
})
Order.belongsTo(User, {
  as: 'user',
  foreignKey: 'user_id'
})

module.exports = {
  User,
  Item,
  Order,
  OrderItems,
  sequelize,
}