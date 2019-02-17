const express = require('express');
const fs = require('fs');
const router = express.Router();

//to ban GET requests
router.get('/', (req, res) => {
    res.status(405).send("GET requests are banned! So will be you.");
});

//For creating new folders
router.post('/new', (req, res) => {
    //get folder name from parameter
    const name = req.body.name;
    if (!fs.existsSync(name)) {
        fs.mkdirSync(name);
        console.log(`Folder ${name} created`);
        res.status(200).send();
    }
    else {
        console.error("Folder creation failure!");
        res.status(500).send();
    }
});

//For renaming
router.post('/rename', (req, res, next) => {
    //get folder name from parameter
    const dir = req.body.data.dir;
    const oldName = req.body.data.oldName;
    const name = req.body.data.newName;
    let fileList = []

    if (fs.existsSync(dir + '/' + oldName)) {
        fs.rename(dir + '/' + oldName, dir + '/' + name, (err) => {
            if (err) throw err;
        });

        console.log(`Folder ${dir + '/' + name} renamed`);

        fs.readdirSync(dir).forEach(file => {
            //read a file's stats
            try {
                let stat = fs.statSync(dir + "/" + file);
                fileList.push({
                    "name": file,
                    "size": stat.size,
                    "la": stat.atime,
                    "lm": stat.mtime,
                    "birth": stat.birthtime,
                    "type": stat.isFile() ? "f" : "d"
                });
            }
            catch (e) {
                //console.log(e);
            }
        });
        res.json(fileList);
    }
    else {
        console.error("Folder doesnt exist!");
        res.status(500).send();
    }
});

//For directory listing
router.post('/', (req, res) => {
    //get directory name from post request made by AuthAction.js
    const dir = req.body.dir;
    let fileList = [];

    //read all files from given dir synchronously
    console.log("Sending directory file listing.");

    fs.readdirSync(dir).forEach(file => {
        //read a file's stats
        try {
            let stat = fs.statSync(dir + "/" + file);
            fileList.push({
                "name": file,
                "size": stat.size,
                "la": stat.atime,
                "lm": stat.mtime,
                "birth": stat.birthtime,
                "type": stat.isFile() ? "f" : "d"
            });
        }
        catch (e) {
            //console.log(e);
        }
    });
    res.json(fileList);
});

module.exports = router;
