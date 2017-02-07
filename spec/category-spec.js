require('should');
const supertest = require('supertest');

const express = require('express');
const app = require('../app');
const request = supertest(app);

const Category = require('../model/category');

describe('CategoryContronller', () => {
  it('GET /categories should return all category', (done) => {
    request
      .get('/categories')
      .expect(200)
      .expect((res) => {
        res.body.totalCount.should.equal(2);
      })
      .end(done);
  });

  it.only('GET /categories/:categoryId ', (done) => {
    request
      .get('/categories/587f0f2586653d19297d40c8')
      .expect(200)
      .expect((res) => {
        res.body.should.eql({
          "_id": "587f0f2586653d19297d40c8",
          "name": "文具",
          "__v": 0
        });
      })
      .end(done)

  });

});