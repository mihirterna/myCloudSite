const express = require('express');
const router = express.Router();
const multer = require('multer');
//const fileUpload = require('express-fileupload');
//router.use(fileUpload());

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, req.query.dir + "/");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

var upload = multer({ storage: storage })

router.post('/:d/', upload.single('file'), function (req, res, next) {
    //Upload
    // if (!req.files) return console.log('No files were uploaded/found.');
    // let sampleFile = req.files.file;
    // console.log('File details ', sampleFile);
    res.json(req.file.filename);
    // Use the mv() method to place the file somewhere on your server
    // sampleFile.mv(req.query.dir + "/" + sampleFile.name, function (err) {
    //     if (err) return console.log("Upload error ", err);
    //     console.log('File uploaded -> ', sampleFile.name);
    //     console.log('File details ', sampleFile);
    //     res.json(sampleFile.name);
    // });
})

module.exports = router;
