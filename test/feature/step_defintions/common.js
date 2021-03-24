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
  if (this.storage.error || this.storage.errorCode) {
    callback(this.storage)
  }
  var self = this;
  var expectedData = self.parse(table.hashes()[0].response);
  debuglog("expectedData ", JSON.stringify(expectedData));
  debuglog("self.storage.res ", JSON.stringify(self.storage.resultData));
  assert.isTrue(self.matchDataWithTheSameOrder(self.storage.resultData, expectedData), "Result object is not matched with the expected one")
  callback();
});

Given(/^I want to request API "([^"]*)" with params$/, function (api, table, callback) {
  var self = this;
  var params = table.hashes(0)[0].params;
  self.urlClient
    .post(api)
    .set('content-type', 'application/json')
    .set('accept', 'application/json')
    .send(JSON.parse(params))
    .expect(200)
    .then(function (response) {
      debuglog(`- API '${api}' - self.storage.resultData`, JSON.stringify(response.body));
      self.storage.resultData = response.body;
      callback();
    })
    .catch(function (error) {
      callback(error);
    })
});
