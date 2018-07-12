var express    = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
let Client = require('ssh2-sftp-client');
let sftp = new Client();
const fs = require('fs');
var username = 'mihir';

var app = express();

app.use(bodyParser());
app.use(express.json());
app.use(cors());
app.use(function (req, res, next) {
  console.log(req.body) ;
//res.json({data:[{1:"one"},{2:"two"},{3:"three"}]});
sftp.connect({
  host: '192.168.31.91',
  port: '22',
  username: username,
  password: 'mihir321'
}).then(() => {
  var dir = '/home/'+username;
  return sftp.list(dir);
}).then((data) => {
  res.json(data); 
});
});
app.listen(5000, () => console.log('Example app listening on port 5000!'))


