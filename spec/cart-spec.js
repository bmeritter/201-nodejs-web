require('should');
const supertest = require('supertest');

const express = require('express');
const app = require('../app');
const request = supertest(app);

const Cart = require('../model/cart');

describe('CartContronller', () => {
  it('GET /carts should return all carts', (done) => {
    request
      .get('/carts')
      .expect(200)
      .expect((res) => {
        res.body.totalCount.should.equal(1);
      })
      .end(done);
  });

  it('GET /carts/:cartId', (done) => {
    request
      .get('/carts/587f0f2586653d19297d40c6')
      .expect(200)
      .expect((res) => {
        res.body.should.eql({
          "_id": "587f0f2586653d19297d40c6",
          "userId": "1",
          "__v": 0,
          "items": [
            {
              "item": "587f0f2586653d19297d40c2",
              "count": 1,
              "_id": "5899cce9d9fd8719fe673436"
            },
            {
              "item": "587f0f2586653d19297d40c3",
              "count": 1,
              "_id": "5899cce9d9fd8719fe673435"
            },
            {
              "item": "587f0f2586653d19297d40c4",
              "count": 1,
              "_id": "5899cce9d9fd8719fe673434"
            }
          ]
        });
      })
      .end(done)
  });

});