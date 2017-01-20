/**
 * Created by ritter on 17-1-18.
 */
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: String,
  price: Number
});

const Item = mongoose.model('Item', ItemSchema);

export default Item;