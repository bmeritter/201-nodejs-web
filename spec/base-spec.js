const refresh = require('../tool/refreshMongo');

before((done) => {
  refresh(done);
});
