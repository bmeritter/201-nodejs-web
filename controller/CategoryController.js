import async from 'async';
import Category from '../model/Category';
import Item from '../model/Item';

export default class CategoryController {
  getAll(req, res, next) {
    Category.find((err, doc) => {
      if (err) {
        return next(err);
      }
      res.status(200).send(doc);
    });
  }

  getCategory(req, res, next) {
    const categoryId = req.params.categoryId;
    Category.find({'_id': categoryId}, (err, doc) => {
      if (err) {
        return next(err);
      }
      res.status(200).send(doc);
    });
  }

  deleteCategory(req, res, next) {
    const categoryId = req.params.categoryId;
    Category.remove({'_id': categoryId}, (err, doc) => {
      if (err)
        return next(err);
      res.status(204).send(doc);
    });
  }

  addCategory(req, res, next) {
    const data = req.body;
    new Category(data).save((err, doc) => {
      if (err)
        return next(err);
      res.status(201).send(doc);
    });
  }

  updateCategory(req, res, next) {
    const categoryId = req.params.categoryId;
    const items = req.body.items;
    Category.update({'_id': categoryId}, {items}, (err, doc) => {
      if (err)
        return next(err);
      res.status(204).send(doc);
    });
  }


}
