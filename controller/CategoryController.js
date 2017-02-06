const Category = require('../model/Category');

class CategoryController {
  getAll(req, res, next) {
    Category.find((err, doc) => {
      if (err) {
        return next(err);
      }
      res.status(200).send(doc);
    });
  }

  getOne(req, res, next) {
    const categoryId = req.params.categoryId;
    Category.findById(categoryId, (err, doc) => {
      if (err) {
        return next(err);
      }
      res.status(200).send(doc);
    });
  }

  delete(req, res, next) {
    const categoryId = req.params.categoryId;
    Category.remove({'_id': categoryId}, (err, doc) => {
      if (err)
        return next(err);
      res.status(204).send(doc);
    });
  }

  createCategory(req, res, next) {
    new Category(req.body).save((err, doc) => {
      if (err)
        return next(err);
      res.status(201).send(doc);
    });
  }

  updateCategory(req, res, next) {
    const categoryId = req.params.categoryId;
    Category.update({'_id': categoryId}, req.body, (err, doc) => {
      if (err)
        return next(err);
      res.status(204).send(doc);
    });
  }


}

module.exports = CategoryController;