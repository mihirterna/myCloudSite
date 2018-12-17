const express = require('express');
const router = express.Router();

router.get('/:d/', function (req, res) {
    res.download(req.query.dir + "/" + req.query.f, req.query.f, function (err) {
        if (err) {
            console.log("Download err ", err);
        }
        else {
            console.log('Download complete ->', req.query.f, req.params.d);
        }
    });
});

module.exports = router;
