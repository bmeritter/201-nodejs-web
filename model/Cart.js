import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  items: [{
    items: [{
      item: {
        type: Schema.ObjectId,
        ref: 'Item'
      },
      count: Number
    }]
  }]
});

const Cart = mongoose.model('Cart', CartSchema);

export default Cart;