import Cart from '../model/Cart';
import Item from '../model/Item';
import async from 'async';

export default class CartController {
  getAll(req, res, next) {

    async.waterfall([
      (done) => {
        Cart.find(done);
      },
      (data, done) => {
        async.map(data[0].items, (item, cb) => {
          Item.findById(item, (err, doc) => {
            cb(null, doc);
          });
        }, done);
      }], (err, data) => {
      if (err)
        return next(err);
      res.send(data);
    });
  }

  getCart(req, res, next) {
    const cartId = req.params.cartId;
    async.waterfall([
      (done) => {
        Cart.findById(cartId, done);
      },
      (data, done) => {
        async.map(data.items, (item, cb) => {
          Item.findById(item, (err, doc) => {
            cb(null, doc);
          });
        }, done);
      }], (err, data) => {
      if (err)
        return next(err);
      res.send(data);
    });
  }

  deleteCart(req, res, next) {
    const cartId = req.params.cartId;
    Cart.remove({'_id': cartId}, (err, doc) => {
      if (err)
        return next(err);
      res.status(204).send(doc);
    });
  }

  addCart(req, res, next) {
    const data = req.body;
    new Cart(data).save((err, doc) => {
      if (err)
        return next(err);
      res.status(201).send(doc);
    });
  }

  updateCart(req, res, next) {
    const cartId = req.params.cartId;
    const items = req.body.items;
    Cart.update({'_id': cartId}, {items}, (err, doc) => {
      if (err)
        return next(err);
      res.status(204).send(doc);
    });
  }

}
