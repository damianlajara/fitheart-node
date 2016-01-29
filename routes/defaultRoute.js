var express = require('express');
var router = express.Router();
var path = require('path');

// A Catch all route for the front end. Node on the backend will send every route to the index.html file
// where angular takes over using the ng-view to display the pages without refreshing
router.get('*', function(req, res) {
    //sendFile needs the root object. Note: If running mocha tests, change the way you look up the root path
    res.sendFile('/index.html', { root:  path.dirname(require.main.filename) });
});

// Expose the router to the rest of the app
module.exports = router;

