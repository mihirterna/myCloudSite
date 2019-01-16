const express = require('express');
const router = express.Router();
var fs = require('fs');
var archiver = require('archiver');

router.post('/', function (req, res) {
    var output = fs.createWriteStream(req.body.dir+ "/" + req.body.zipName + ".zip");
    
    var archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
    });

    output.on('close', function() {
        console.log(archive.pointer() + ' total bytes');
        console.log(req.body.dir +"/"+ req.body.zipName + ".zip",'archiver has been finalized and the output file descriptor has closed.');
    });

    archive.on('warning', function(err) {
        if (err.code === 'ENOENT') {
          // log warning
          console.log("zip warning");
        } else {
          // throw error
          throw err;
        }
    });

    archive.on('error', function(err) {
        throw err;
    });

    archive.pipe(output);

    for (var i=0; i<req.body.cfs.length; i++){
        try{
            if(fs.lstatSync(req.body.dir+"/"+req.body.cfs[i]).isDirectory()){
                archive.directory(req.body.dir+"/"+req.body.cfs[i],req.body.cfs[i]);
            }
            else if(fs.lstatSync(req.body.dir+"/"+req.body.cfs[i]).isFile()){
                archive.file(req.body.dir+"/"+req.body.cfs[i],{ name:req.body.cfs[i]});
            }            
        }catch(e){
          // Handle error
          if(e.code == 'ENOENT'){
            //no such file or directory
            //do something
            console.log("ENOENT ",e);
          }else {
              console.log("err ",e);
            //do something else
          }
       }       
    }
    archive.finalize();
    res.json("Done");
});

module.exports = router;

