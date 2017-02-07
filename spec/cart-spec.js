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

});