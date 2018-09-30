const express    = require('express');
const fileUpload = require('express-fileupload');
const router = express.Router();
router.use(fileUpload());

router.post('/:d/',function (req,res,next){
    //Upload
    if (!req.files) return console.log('No files were uploaded/found.');
        
    let sampleFile = req.files.file;
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(req.query.dir+"/"+sampleFile.name, function(err) {
    if (err)    return console.log(err);
    console.log('File uploaded -> ',sampleFile.name);
    });
})

module.exports = router;