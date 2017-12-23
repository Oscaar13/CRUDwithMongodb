var express = require('express');
var router = express.Router();
var Models = require('../modules/modules');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* For Updated user */
router.put('/update', function(req, res, next) {
  
  console.log(req.body);
  var user1;

  Models.User.findOneAndUpdate({name:req.body.name}, {password:req.body.password}, function(err, user1){
    if(!err) {
      res.send('Updated successful!');
      console.log('Updated successful!');
    } else {
      res.send('Updated Error!');
      console.log('Updated Error!');
    }
  });  
});

/* For Delete user */
router.delete('/delete', function(req, res, next) {
  
  console.log(req.body);
  var user2;

  Models.User.findOneAndRemove({name:req.body.name}, function(err, user2){
    if(user2 != 'null') {   //? 'null'??
      res.send('Deleted successful!');
      console.log(user2);
    } else {
      res.send('Deleted Error!');
      console.log('Deleted Error!');
    }
  });  
});

/* For Read User */

router.post('/read', function(req, res, next) {
  
  console.log(req.body);
  var user3;

  Models.User.findOne({name:req.body.name}, function(err, user3){
    if(user3 != 'null') {   //? 'null'??
      res.send('Read successful!');
      console.log(user3);
    } else {
      res.send('Read Error!');
      console.log('Deleted Error!');
    }
  });  
});

/* For user registration. */
router.post('/register', function(req, res, next) {

  console.log(req.body);

  var user;

  Models.User.find({name:req.body.name}, function(err, user){

    if(err) {
      res.send('Unknow Error!!');
    } else {
        if(user.length > 0) {
          // User already exists
          res.send('User already exists!');
          console.log('User already exists!');
        } else {
          // New user
          var newUser = new Models.User({name:req.body.name, password:req.body.password})

          newUser.save(function(err) {
              if(err) {
                res.send('Unknown error by Created user!')
              } else {
                res.send('Registered successful!');
                console.log('Registered successful!');
              }
          });
        }
    }
  });

  /*var newUser = new Models.User({name:req.body.name, password:req.body.password})

  newUser.save(function(err) {
      if(err){
        console.log(err);
      } else {
        console.log("Success!");
      }
  });*/

  //res.send('Here is a registration module!');
});


module.exports = router;
