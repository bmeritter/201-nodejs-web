const Category = require('../model/category');
const Item = require('../model/item');
const constant = require('../config/constant');
const async = require('async');

class CategoryController {
  getAll(req, res, next) {
    async.series({
      item: (cb) => {
        Category.find({}, cb);
      },
      totalCount: (cb) => {
        Category.count(cb);
      }
    }, (err, result) => {
      if (err) {
        return next(err);
      }
      return res.status(constant.httpCode.OK).send(result);
    });
  }

  getOne(req, res, next) {
    const categoryId = req.params.categoryId;
    Category.findById(categoryId, (err, doc) => {
      if (err) {
        return next(err);
      }
      if (!doc) {
        return res.sendStatus(constant.httpCode.NOT_FOUND);
      }
      doc
      return res.status(constant.httpCode.OK).send(doc);
    });
  }

  delete(req, res, next) {
    const categoryId = req.params.categoryId;

    async.waterfall([
      (done) => {
        Item.findOne({categoryId}, (err, doc) => {
          if (err) {
            done('FORBIDDEN', null);
          } else {
            done(null, doc);
          }
        });
      },
      (data, done) => {
        Category.findOneAndRemove({'_id': categoryId}, () => {

        });
      }
    ], (err, data) => {
      if (err === 'FORBIDDEN ') {
        return res.sendStatus(constant.httpCode.FORBIDDEN);
      } else {
        return res.sendStatus(constant.httpCode.NO_CONTENT);
      }
    });
  }

  create(req, res, next) {
    new Category(req.body).save((err, doc) => {
      if (err) {
        return next(err);
      }
      return res.status(constant.httpCode.CREATED).send({uri: `categories/${doc._id}`});
    });
  }

  update(req, res, next) {
    const categoryId = req.params.categoryId;
    Category.findOneAndUpdate({'_id': categoryId}, req.body, (err, doc) => {
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

module.exports = CategoryController;