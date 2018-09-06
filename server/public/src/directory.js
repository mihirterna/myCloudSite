const express    = require('express');
const router = express.Router();
const fs = require('fs');


router.post('/',function (req,res,next){

    //Directory
    const dir = req.body.data.dir;
    let list = [];
    console.log(req.body,dir);
    fs.readdirSync(dir).forEach(file => {
        console.log(dir,file);
        try {
            let stat = fs.statSync(dir + "/" + file);
            if (stat.isFile()) {
                list.push({
                    "name": file,
                    "type": "f",
                    "size": stat.size,
                    "la": stat.atime,
                    "lm": stat.mtime,
                    "birth": stat.birthtime
                });
            }
            else if (stat.isDirectory()) {
                list.push({
                    "name": file,
                    "type": "d",
                    "size": stat.size,
                    "la": stat.atime,
                    "lm": stat.mtime,
                    "birth": stat.birthtime
                });
            }
        }
        catch (e){
            //console.log(e);
        }
    });
    console.log("sending list")
    res.json(list);
});

module.exports = router;