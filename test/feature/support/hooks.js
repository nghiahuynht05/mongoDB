var {After} = require('cucumber');

After(function(){
    process.exit(0);
})