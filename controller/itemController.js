const Item = require('../model/item');
const constant = require('../config/constant');

class ItemController {
  getAll(req, res, next) {
    Item.find({})
      .populate('categoryId')
      .exec((err, doc) => {
        if (err) {
          return next(err);
        }
        Item.count((error, data) => {
          if (error) {
            return next(error);
          }
          if (!data) {
            return res.status(constant.httpCode.NOT_FOUND).send({item: doc, totalCount: data});
          }
          return res.status(constant.httpCode.OK).send({item: doc, totalCount: data});
        });
      });
  }

  getOne(req, res, next) {
    const itemId = req.params.itemId;
    Item.findById(itemId)
      .populate('categoryId')
      .exec((err, doc) => {
        if (err) {
          return next(err);
        }
        if (!doc) {
          return res.sendStatus(constant.httpCode.NOT_FOUND);
        }
        return res.status(constant.httpCode.OK).send(doc);
      });
  }

  delete(req, res, next) {
    const itemId = req.params.itemId;
    Item.findOneAndRemove({'_id': itemId}, (err, doc) => {
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
    const data = req.body;
    new Item(data).save((err, doc) => {
      if (err) {
        return next(err);
      }
      return res.status(constant.httpCode.CREATED).send({uri: `items/${doc._id}`});
    });
  }

  update(req, res, next) {
    const itemId = req.params.itemId;
    Item.findOneAndUpdate({'_id': itemId}, req.body, (err, doc) => {
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

module.exports = ItemController;
