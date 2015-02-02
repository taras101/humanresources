var express = require('express');
var mongoose = require('mongoose');
var Employee = mongoose.model('Employee');
var Team = mongoose.model('Team');
var router = express.Router();

router.get('/employees', function(req, res, next) {
  Employee.find().sort('name.last').exec(function(error, results) {
    if (error) {
      return next(error);
    }

    // Respond with valid data
    res.json(results);
  });
});

router.get('/employees/:employeeId', function(req, res, next) {
  Employee.findOne({
    id: req.params.employeeId
  }).populate('team').exec(function (error, results) {
    if (error) {
      return next(error);
    }

    // If valid user was not found, send 404
    if (!results) {
      res.send(404);
    }

    // Respond with valid data
    res.json(results);
  });
});
router.post('/employees', function (req, res, next) {
  // Remove this or mongoose will throw an error
  // because we would be trying to update the mongo ID
  console.info('Adding employee: ' + JSON.stringify(req.body));
  Employee.findOne().sort({ _id: -1 }).limit(1).exec(function(error, result1) {
    if (error) {
      return next(error);
    }
    // Respond with valid data
    if (result1) {
      console.info('Last employee ID: ' + result1.id);
      res.locals.nextID = (parseInt(result1.id) + 1).toString();
    } else {
      res.locals.nextID = '1000001';
    }
    Employee.create({
      id: res.locals.nextID,
      name: {
        first: req.body.first,
        last: req.body.last
      }
    }, function (error, results) {
      if (error) {
        console.error('Error: ' + error);
      }
      console.info('Done adding employee: ' + results);
      res.json(results);
    });
  });
});
router.put('/employees/:employeeId', function (req, res, next) {
  // Remove this or mongoose will throw an error
  // because we would be trying to update the mongo ID
  delete req.body._id;
  req.body.team = req.body.team._id;

  Employee.update({
    id: req.params.employeeId
  }, req.body, function (err, numberAffected, response) {
    if (err) {
      return next(err);
    }

    res.send(200);
  });
});

module.exports = router;