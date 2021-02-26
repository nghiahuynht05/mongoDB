var { Given } = require('cucumber');
var debug = require('debug');
var debuglog = debug('SOCKET:*');

Given(/^Socket is connect$/, function (callback) {
    var self = this;
    self.urlClient.get("/")
        .end(function (err, res) {
            if (err) {
                callback("Server is not running. " + err);
            } else {
                callback();
            }
        })
});

Given(/^I send a web socket request with event and data$/, function (table, callback) {
    var self = this;
    var { event, requestEvent, responseEvent, requestData } = table.hashes()[0];
    if (event) {
        requestEvent = responseEvent = event;
    };
    function emitEvent() {
        if (requestData) {
            // // requestData = JSON.parse(requestData);
            // // token && (requestData.token = token);
            debuglog(`'${requestEvent}' - EMIT `, JSON.stringify(requestData));
            self.wsClient.emit(requestEvent, requestData);
        } else {
            self.wsClient.emit(requestEvent);
        }
    };
    self.wsClient.on("connect", function () {
        debuglog(`- ON 'connect' - response`);
        emitEvent();
    });
    self.wsClient.on(responseEvent, function (data) {
        debuglog(`- ON '${responseEvent}' - response`, JSON.stringify(data));
        self.storage.resultData = data;
        callback();
    })

})