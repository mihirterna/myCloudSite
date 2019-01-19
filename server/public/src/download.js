const express = require('express');
const router = express.Router();
var fs = require('fs');

router.get('/:d/', function (req, res) {
    res.download(req.query.dir + "/" + req.query.f, req.query.f, function (err) {
        if (err) {
            console.log("Download err ", err);
        }
        else {
            console.log('Download complete ->', req.query.f, req.params.d);
            if(req.params.d === "tmp"){
                fs.unlink(req.query.dir + "/" + req.query.f,function(err){
                    if(err) return console.log(err);
                    console.log('Download complete ->', req.query.f, 'and deleted successfully');
               });
            }
        }
    });
});

router.post('/:d/', function (req, res) {
    console.log(req.body);
});

module.exports = router;
