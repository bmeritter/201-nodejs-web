require('should');
const supertest = require('supertest');

const express = require('express');
const app = require('../app');
const request = supertest(app);

const Item = require('../model/item');

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

  it('GET /items/:itemId should return a item', (done) => {
    request
      .get('/items/587f0f2586653d19297d40c2')
      .expect(200)
      .expect((res) => {
        res.body.should.eql({
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

  it('POST /items should return uri', (done) => {
    const item = {
      name: 'test',
      price: 45,
      categoryId: '587f0f2586653d19297d40c8'
    };

    request
      .post('/items')
      .send(item)
      .expect(201)
      .expect((res) => {
        Item.findOne(item, (err, doc) => {
          res.body.uri.shoule.equal(`items/${doc._id}`);
        })
      })
      .end(done);
  });

  it('DELETE /items should return 204', (done) => {
    const itemId = '587f0f2586653d19297d40c2';

    request
      .delete(`/items/${itemId}`)
      .expect(204)
      .end(done)
  });

  it('PUT /items/:itemId should return 204', (done) => {
    const itemId = '587f0f2586653d19297d40c3';
    const item = {
      name: 'test6',
      price: 34,
      categoryId: '587f0f2586653d19297d40c8'
    };
    request
      .put(`/items/${itemId}`)
      .send(item)
      .expect(204)
      .end(done)
  });

});