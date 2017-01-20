import async from 'async';
import Category from '../model/Category';
import Item from '../model/Item';

export default class CategoryController {
  getAll(req, res, next) {
    async.waterfall([
      (done) => {
        Category.find(done);
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

  getCategory(req, res, next) {
    const categoryId = req.params.categoryId;
    async.waterfall([
      (done) => {
        Category.findById(categoryId, done);
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
