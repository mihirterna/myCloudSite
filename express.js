var express    = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();

app.use(bodyParser());
app.use(express.json());
app.use(cors());
app.use(function (req, res, next) {
  console.log(req.body) ;
res.json({data:[{1:"one"},{2:"two"},{3:"three"}]});
})

app.listen(5000, () => console.log('Example app listening on port 5000!'))
