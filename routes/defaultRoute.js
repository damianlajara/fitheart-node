var express = require('express');
var router = express.Router;

// A Catch all route for the front end. Node on the backend will send every route to the index.html file
// where angular takes over using the ng-view to display the pages without refreshing
router.get('*', function(req, res) {
    res.sendFile('../public/views/index.html');
});

// Expose the router to the rest of the app
module.exports = router;

