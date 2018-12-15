const express = require('express');
const fs = require('fs');
const router = express.Router();

//to ban GET requests
router.get('/', function(req, res){
    res.status(405).send("GET requests are banned! So will be you.");
});

//For creating new folders
router.post('/new', (req, res) => {
    //get folder name from parameter
    const name = req.body.name;
    if(!fs.existsSync(name)) {
        fs.mkdirSync(name);
        console.log(`Folder ${name} created`);
        res.status(200);
    }
    else {
        console.error("Folder creation failure!");
        res.status(500);
    }
});

//For directory listing
router.post('/', function (req, res) {
    
    //get directory name from post request made by AuthAction.js
    const dir = req.body.data.dir;
    let fileList = [];

    //read all files from given dir synchronously
    console.log("Sending directory file listing.");
    try {
        fs.readdirSync(dir).forEach(file => {
            //read a file's stats
            let stat = fs.statSync(dir + "/" + file);
            fileList.push({
                "name": file,
                "size": stat.size,
                "la": stat.atime,
                "lm": stat.mtime,
                "birth": stat.birthtime,
                "type": stat.isFile() ? "f" : "d"
            });
        });
        res.status(200).send(JSON.stringify(fileList));
    } catch(e) {
        console.error("Oopsie! Something went wrong!");
        res.status(500);
    }
});

module.exports = router;
