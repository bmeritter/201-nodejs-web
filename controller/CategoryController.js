const Category = require('../model/Category');
const Item = require('../model/Item');
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
          res.status(constant.NOT_FOUND).send({item: doc, totalCount: data});
        }
        res.status(constant.OK).send({item: doc, totalCount: data});
      });
    });
  }

  getOne(req, res, next) {
    const categoryId = req.params.categoryId;
    Category.findById(categoryId, (err, doc) => {
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
    const categoryId = req.params.categoryId;

    Item.findOne({categoryId}, (err, doc) => {
      if (err) {
        return next(err);
      }
      if (doc) {
        return res.sendStatus(constant.FORBIDDEN);
      }

      Category.findOneAndRemove({'_id': categoryId}, (err, doc) => {
        if (!doc) {
          res.sendStatus(constant.NOT_FOUND);
        }
        if (err) {
          return next(err);
        }
        res.sendStatus(constant.NO_CONTENT);
      });
    });
  }

  create(req, res, next) {
    new Category(req.body).save((err, doc) => {
      if (err) {
        return next(err);
      }
      res.status(constant.CREATED).send({uri: 'categories/' + doc._id});
    });
  }

  update(req, res, next) {
    const categoryId = req.params.categoryId;
    Category.findOneAndUpdate({'_id': categoryId}, req.body, (err, doc) => {
      if (!doc) {
        return res.sendStatus(constant.NOT_FOUND);
      }
      if (err) {
        return next(err);
      }
      res.sendStatus(constant.NO_CONTENT);
    });
  }
}

module.exports = CategoryController;