var { Given, When, Then } = require('cucumber');
var chai = require('chai');
var assert = chai.assert;
var debug = require('debug');
var debuglog = debug('Common:*');

Then(/^I should get the object result matches with$/, function (table, callback) {
    var self = this;
    var expectData = JSON.parse(table.hashes()[0].response);
    debuglog("Expect data ", JSON.stringify(expectData));
    debuglog("self.storage.resultData ", JSON.stringify(self.storage.resultData));
    assert.isTrue(self.matchData(self.storage.resultData, expectData), "Result object is not matched with the expected one");
    self.wsClient.disconnect();
    callback()
});

Then(/^The return data should be matched correctly order with$/, function (table, callback) {
    if (this.result.error || this.result.errorCode) {
      callback(this.result)
    }
    var self = this;
    var expectedData = self.parse(table.hashes()[0].response);
    debuglog("expectedData ", JSON.stringify(expectedData));
    debuglog("self.result.res ", JSON.stringify(self.result.res));
    assert.isTrue(self.matchDataWithTheSameOrder(self.result.res, expectedData), "Result object is not matched with the expected one")
    callback();
  });
