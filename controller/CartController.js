const Cart = require('../model/Cart');
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
          if (error) {
            return next(error);
          }
          if (!data) {
            res.status(constant.NOT_FOUND).send({item: doc, totalCount: data});
          }
          res.status(constant.OK).send({item: doc, totalCount: data});
        });
      });
  }

  getOne(req, res, next) {
    const cartId = req.params.cartId;
    Cart.findById(cartId)
      .populate('items.item')
      .exec((err, doc) => {
        if (!doc) {
          res.sendStatus(constant.NOT_FOUND);
        }
        if (err) {
          return next(err);
        }
        res.status(constant.OK).send(doc);
      })
  }

  delete(req, res, next) {
    const cartId = req.params.cartId;
    Cart.remove({'_id': cartId}, (err, doc) => {
      if (!doc) {
        res.sendStatus(constant.NOT_FOUND);
      }
      if (err) {
        return next(err);
      }
      res.status(constant.NO_CONTENT).send(doc);
    });
  }

  create(req, res, next) {
    new Cart(req.body).save((err, doc) => {
      if (err) {
        return next(err);
      }
      res.status(constant.CREATED).send({uri: 'carts/' + doc._id});
    });
  }

  update(req, res, next) {
    const cartId = req.params.cartId;
    Cart.update({'_id': cartId}, req.body, (err, doc) => {
      if (err) {
        return next(err);
      }
      res.status(constant.NO_CONTENT).send(doc);
    });
  }

}

module.exports = CartController;