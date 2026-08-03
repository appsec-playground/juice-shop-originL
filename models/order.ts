/*
 * Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import {
  Model,
  type InferAttributes,
  type InferCreationAttributes,
  DataTypes,
  type CreationOptional,
  type Sequelize
} from 'sequelize'

class Order extends Model<
InferAttributes<Order>,
InferCreationAttributes<Order>
> {
  declare UserId: CreationOptional<number>
  declare id: CreationOptional<number>
  declare orderId: CreationOptional<string>
  declare totalPrice: CreationOptional<number>
  declare delivered: CreationOptional<boolean>
}

const OrderModelInit = (sequelize: Sequelize) => {
  Order.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      orderId: DataTypes.STRING,
      totalPrice: DataTypes.DECIMAL,
      delivered: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      UserId: {
        type: DataTypes.INTEGER
      }
    },
    {
      tableName: 'Orders',
      sequelize
    }
  )
}

export { Order as OrderModel, OrderModelInit }
