import * as basicTests from './Tests/basicTests';
import * as serverTests from './Tests/serverTests';
import tsUnit = require('tsunit.external/tsUnit');

doTestFor(basicTests);
doTestFor(serverTests);


function doTestFor(testc : any) {

    var test = new tsUnit.Test(testc).run();

    if (test.errors.length > 0) {
        console.log("TEST ERRORS\r\n");
        console.log(test.errors);
    }
    else {
        console.log("TEST PASSED\r\n");
    }
}
