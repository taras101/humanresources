var mongoose = require('mongoose');
var dbUrl = 'mongodb://taras101:data101@ds031531.mongolab.com:31531/heroku_app33499557';

mongoose.connect(dbUrl);

// Close the Mongoose connection on Control+C
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected');
    process.exit(0);
  });
});

require('../models/employee');
require('../models/team');