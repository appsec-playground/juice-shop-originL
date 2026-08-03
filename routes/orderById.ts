/*
 * Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import { type Request, type Response, type NextFunction } from 'express'

import { OrderModel } from '../models/order'
import * as utils from '../lib/utils'
import * as security from '../lib/insecurity'

export function orderById () {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const order = await OrderModel.findOne({ where: { id: req.params.id } })
      const user = security.authenticatedUsers.from(req)
      if (!user) {
        next(new Error('Blocked illegal activity by ' + req.socket.remoteAddress))
        return
      }
      if (order == null) {
        res.status(404).json({ status: 'error', data: 'Order not found' })
        return
      }
      res.status(200).json({ status: 'success', data: utils.queryResultToJson(order) })
    } catch (error) {
      next(error)
    }
  }
}
