const dw = require('./src/download');
const up = require('./src/upload');
const dir = require('./src/directory');
const express    = require('express');
const cors = require('cors');
const bp = require('body-parser');
const app = express();

app.use(bp.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

app.use('/dir',dir);
app.use('/dw',dw);
app.use('/up',up);

app.listen(5000, () => console.log('Example app listening on port 5000!'))

