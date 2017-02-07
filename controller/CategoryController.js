const Category = require('../model/Category');
const constant = require('../config/constant');

class CategoryController {
  getAll(req, res, next) {
    Category.find((err, doc) => {
      if (err) {
        return next(err);
      }
      res.status(constant.OK).send(doc);
    });
  }

  getOne(req, res, next) {
    const categoryId = req.params.categoryId;
    Category.findById(categoryId, (err, doc) => {
      if (err) {
        return next(err);
      }
      res.status(constant.OK).send(doc);
    });
  }

  delete(req, res, next) {
    const categoryId = req.params.categoryId;
    Category.remove({'_id': categoryId}, (err, doc) => {
      if (err)
        return next(err);
      res.status(constant.NO_CONTENT).send(doc);
    });
  }

  create(req, res, next) {
    new Category(req.body).save((err, doc) => {
      if (err)
        return next(err);
      res.status(constant.CREATED).send(doc);
    });
  }

  update(req, res, next) {
    const categoryId = req.params.categoryId;
    Category.update({'_id': categoryId}, req.body, (err, doc) => {
      if (err)
        return next(err);
      res.status(constant.NO_CONTENT).send(doc);
    });
  }
}

module.exports = CategoryController;