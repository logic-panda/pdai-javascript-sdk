const assume = require('assume');
const panda = require('../lib/panda')

describe('panda', function() {

  it('exposes version', function () {
    assume(panda.version).equals(require('../package').version);
  });

})
