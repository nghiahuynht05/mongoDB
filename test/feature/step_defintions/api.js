var { Given } = require('cucumber');

Given('Test API', function () {
    var param = { 'user': "abcd" };
    this.apiClient()
        .post('/api/user/add')
        .send(param)
        .set('Accept', 'application/json')
        .expect(200)
        .then(function (res) {
            console.log(res.body)
        })
        .catch(function (err) {
            console.log(err)
        })
})