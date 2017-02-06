const mogoose = require('mongoose');
const rawData = require('./fixture/raw-data');
const Item = require('../model/Item');
const Category = require('../model/Category');
const Cart = require('../model/Cart');

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