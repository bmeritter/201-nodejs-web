const Category = require('../model/category');
const Item = require('../model/item');
const constant = require('../config/constant');

class CategoryController {
  getAll(req, res, next) {
    Category.find((err, doc) => {
      if (err) {
        return next(err);
      }
      Category.count((error, data) => {
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
    const categoryId = req.params.categoryId;
    Category.findById(categoryId, (err, doc) => {
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
    const categoryId = req.params.categoryId;

    Item.findOne({categoryId}, (err, doc) => {
      if (err) {
        return next(err);
      }
      if (doc) {
        return res.sendStatus(constant.httpCode.FORBIDDEN);
      }

      Category.findOneAndRemove({'_id': categoryId}, (err, doc) => {
        if (err) {
          return next(err);
        }
        if (!doc) {
          return res.sendStatus(constant.httpCode.NOT_FOUND);
        }
        return res.sendStatus(constant.httpCode.NO_CONTENT);
      });
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