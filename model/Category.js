import  mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  items: [{
    type: Schema.ObjectId,
    ref: 'Item'
  }]
});

const Category = mongoose.model('Category', CategorySchema);

export default Category;