"use strict";
const basicTests = require('./Tests/basicTests');
const serverTests = require('./Tests/serverTests');
const tsUnit = require('tsunit.external/tsUnit');
doTestFor(basicTests);
doTestFor(serverTests);
function doTestFor(testc) {
    var test = new tsUnit.Test(testc).run();
    if (test.errors.length > 0) {
        console.log("TEST ERRORS\r\n");
        console.log(test.errors);
    }
    else {
        console.log("TEST PASSED\r\n");
    }
}
//# sourceMappingURL=index.js.map