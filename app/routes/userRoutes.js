var express = require('express');
var router = express.Router();
var User = require('../models/user');

// Root mount point(/api) is in app.js
router.route('/users')
    // Get all users (GET => /users)
    .get(function(req, res) {
        console.log("made a request to the server!");
        User.find(function(err, users) {
            if(err) {
                res.send(err);
            } else {
                res.json(users);
            }
        })
    })
    // Create a user (POST => /users)
    .post(function(req,res) {
        var user = new User(req.body);
        user.save(function(err) {
            if(err) {
                res.send(err);
            } else {
                res.json({message: 'User Created!'});
            }
        });
    });

router.route('/users/:user_id')
    // Get a specific user (GET => /users/:user_id)
    .get(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            if(err) {
                res.send(err);
            } else {
                res.json(user);
            }
        })
    })
    // Update the user with the id passed in the request params (PUT => /users/:user_id)
    .put(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            if(err) {
              res.send(err);
            } else {
               // https://docs.mongodb.org/manual/reference/command/update/#update-command-output
                user.update(req.body, null, function (err, response) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.json({message: 'User updated!'});
                    }
                });
            }
        });
    })
    // Delete the user with the id passed in the request params (DELETE => /users/:user_id)
    .delete(function(req, res) {
        User.remove({ _id: req.params.user_id }, function(err, user) {
            if(err) {
                res.send(err);
            } else {
                res.json({ message: 'User Successfully deleted' });
            }
        });
    });

// Expose the router to the rest of the app
module.exports = router;