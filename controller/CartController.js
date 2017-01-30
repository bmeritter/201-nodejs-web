import Cart from '../model/Cart';

export default class CartController {
  getAll(req, res, next) {

    Cart.find({})
      .populate('item')
      .exec((err, doc) => {
        if (err) {
          return next(err);
        }

        res.status(200).send(doc);
      });
  }

  getCart(req, res, next) {
    const cartId = req.params.cartId;
    Cart.findOne({'_id': cartId})
      .populate('item')
      .exec((err, doc) => {
        if (err) {
          return next(err);
        }

        res.status(200).send(doc);
      })
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
