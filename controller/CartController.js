import Category from '../model/Category';

export default class CategoryController {
  getAll(req, res, next) {
    Category.find((err, doc) => {
      if (err)
        return next(err);
      res.status(200).send(doc);
    });
  }

}
