import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  userId: String,
  items: [{
    count: Number,
    item: {
      type: Schema.ObjectId,
      ref: 'Item'
    }
  }]
});

const Cart = mongoose.model('Cart', CartSchema);

export default Cart;