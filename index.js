var express    = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const fs = require('fs');
var app = express();
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(express.json());
app.use(cors());
app.post('/',function (req, res) {
  console.log(req.body) ;
  switch(req.body.data.head){
      case "init":
      //Verify IP of sender
      break;
	  
      case "download":
      res.download(req.body.data.dir+"/"+req.body.data.fName,req.body.data.fName, function (err) {
      if (err){
       console.log(err);
        }
     else{
      console.log('download complete');}
});
      break;
	  
      case "upload":
      storeFile(req.body.data.dir,req.body.data.fName);
      break;
	  
      case "getList":
	  var dir = req.body.data.dir;
	  var list = [];
	  fs.readdirSync(dir).forEach(file => {
	  var stat = fs.statSync(dir+"/"+file);
	  if(stat.isFile()){
	  list.push({"name":file,"type":"f","size":stat.size,"la":stat.atime,"lm":stat.mtime,"birth":stat.birthtime});
	  }
	  else if(stat.isDirectory()){
		 list.push({"name":file,"type":"d","size":stat.size,"la":stat.atime,"lm":stat.mtime,"birth":stat.birthtime});
	  }
	  });
	  res.json(list);
      break;
	  
	  
	  
      default:
	  console.log("unknown req",req);
      break;
  }
});
function sendFile(dir,fName,callback){

}

function storeFile(dir,fName,callback){

}

app.listen(5000, () => console.log('Example app listening on port 5000!'))



