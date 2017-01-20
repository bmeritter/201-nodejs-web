import mogoose from 'mongoose';
import rawData from './fixture/raw-data';
import Item from '../model/Item';
import Category from '../model/Category';
import Cart from '../model/Cart';

const modelMap = {
  Item,
  Cart,
  Category
};

let docs = Object.keys(rawData);

mogoose.connect('mongodb://localhost/supermarket');

Object.keys(rawData).forEach((v) => {
  modelMap[v].remove(() => {
    modelMap[v].create(rawData[v], () => {
      docs = docs.filter(doc => doc !== v);
      if (docs.length === 0) {
        process.exit(0);
      }
    })
  });
});