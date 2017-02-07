require('should');
const supertest = require('supertest');

const express = require('express');
const app = require('../app');
const request = supertest(app);

const Item = require('../model/Item');

describe('ItemContronller', () => {
  it('GET /items should return all items', (done) => {
    request
      .get('/items')
      .expect(200)
      .expect((res) => {
        res.body.totalCount.should.equal(3);
      })
      .end(done);
  });

  it('GET /items/itemId should return a item', (done) => {
    request
      .get('/items/587f0f2586653d19297d40c2')
      .expect(200)
      .expect((res) => {
        res.body.should.equal({
          "_id": "587f0f2586653d19297d40c2",
          "name": "钢笔",
          "price": 12,
          "categoryId": {
            "_id": "587f0f2586653d19297d40c8",
            "name": "文具",
            "__v": 0
          },
          "__v": 0
        });
      })
      .end(done);
  });
});