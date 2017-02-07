const Cart = require('../model/cart');
const constant = require('../config/constant');

class CartController {
  getAll(req, res, next) {
    Cart.find({})
      .populate('items.item')
      .exec((err, doc) => {
        if (err) {
          return next(err);
        }
        Cart.count((error, data) => {
          if (!data) {
            return res.status(constant.httpCode.NOT_FOUND).send({item: doc, totalCount: data});
          }
          return res.status(constant.httpCode.OK).send({item: doc, totalCount: data});
        });
      });
  }

  getOne(req, res, next) {
    const cartId = req.params.cartId;
    Cart.findById(cartId)
      .populate('items.item')
      .exec((err, doc) => {
        if (err) {
          return next(err);
        }
        if (!doc) {
          return res.sendStatus(constant.httpCode.NOT_FOUND);
        }
        return res.status(constant.httpCode.OK).send(doc);
      })
  }

  delete(req, res, next) {
    const cartId = req.params.cartId;
    Cart.findOneAndRemove({'_id': cartId}, (err, doc) => {
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      return res.sendStatus(constant.httpCode.NO_CONTENT);
    });
  }

  create(req, res, next) {
    new Cart(req.body).save((err, doc) => {
      if (err) {
        return next(err);
      }
      return res.status(constant.httpCode.CREATED).send({uri: `carts/${doc._id}`});
    });
  }

  update(req, res, next) {
    const cartId = req.params.cartId;
    Cart.findOneAndUpdate({'_id': cartId}, req.body, (err, doc) => {
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      return res.sendStatus(constant.httpCode.NO_CONTENT);
    });
  }

}

module.exports = CartController;