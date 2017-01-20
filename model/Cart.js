import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  items: [{
    type: Schema.ObjectId,
    ref: 'Item'
  }]
});

const Cart = mongoose.model('Cart', CartSchema);

export default Cart;