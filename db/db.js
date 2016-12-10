var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/images', function(err) {
    if(err) {
        console.log('err '+err);
    } else {
        console.log('connection established ');
    }
});