const Item = require('../model/Item');
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
            res.status(constant.NOT_FOUND).send({item: doc, totalCount: data});
          }
          res.status(constant.OK).send({item: doc, totalCount: data});
        });
      });
  }

  getOne(req, res, next) {
    const itemId = req.params.itemId;
    Item.findById(itemId)
      .populate('categoryId')
      .exec((err, doc) => {
        if (!doc) {
          res.sendStatus(constant.NOT_FOUND);
        }
        if (err) {
          return next(err);
        }
        res.status(constant.OK).send(doc);
      });
  }

  delete(req, res, next) {
    const itemId = req.params.itemId;
    Item.remove({'_id': itemId}, (err, doc) => {
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
    const data = req.body;
    new Item(data).save((err, doc) => {
      if (err) {
        return next(err);
      }
      res.status(constant.CREATED).send({uri: 'items/' + doc._id});
    });
  }

  update(req, res, next) {
    const itemId = req.params.itemId;
    Item.update({'_id': itemId}, req.body, (err, doc) => {
      if (err) {
        return next(err);
      }
      res.status(constant.NO_CONTENT).send(doc);
    });
  }
}

module.exports = ItemController;
