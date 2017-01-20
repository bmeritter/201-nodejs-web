export default {
  Item: [{
    '_id': '587f0f2586653d19297d40c2',
    name: '钢笔',
    price: 12
  }, {
    '_id': '587f0f2586653d19297d40c3',
    name: '电脑',
    price: 6000
  }, {
    '_id': '587f0f2586653d19297d40c4',
    name: '手机',
    price: 4000
  }, {
    '_id': '587f0f2586653d19297d40c5',
    name: '语文书',
    price: 30
  }],
  Cart: [{
    '_id': '587f0f2586653d19297d40c6',
    items: [
      {
        itemId: '587f0f2586653d19297d40c2',
        count: 1
      }, {
        itemId: '587f0f2586653d19297d40c3',
        count: 1
      },
      {
        itemId: '587f0f2586653d19297d40c4',
        count: 1
      }
    ]
  }],
  Category: [{
    '_id': '587f0f2586653d19297d40c8',
    name: '文具',
    items: ['587f0f2586653d19297d40c2']
  }, {
    '_id': '587f0f2586653d19297d40c9',
    name: '电子产品',
    items: ['587f0f2586653d19297d40c3', '587f0f2586653d19297d40c4']
  }]
};