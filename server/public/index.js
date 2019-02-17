const dw = require('./src/download');
const up = require('./src/upload');
const dir = require('./src/directory');
const share = require('./src/share');
const jw = require('./src/jwt');

const express = require('express');
const helmet = require('helmet'); //secures express apps by HTTP headers
const cors = require('cors'); //provides cross-origin-resource-sharing utilities
const bp = require('body-parser');
const fs = require('fs');
const https = require('https');

// const options = {
//     key: fs.readFileSync("E://signed.key"),
//     cert: fs.readFileSync("E://cert.crt"),
//     dhparam: fs.readFileSync("E://dh.pem")
// };

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cors());
//app.use(bp.urlencoded({ extended: false }));

app.use('/dir', dir);
app.use('/dw', dw);
app.use('/up', up);
app.use('/shr', share);
app.use('/jwt', jw);

const PORT = process.env.PORT || 5000; //when deployed in container, PORT will be given by that environment

app.listen(PORT, () => console.log(`Backend is listening on port ${PORT}!`));

//https.createServer(options, app).listen(PORT, () => console.log(`Backend is listening on port ${PORT}!`));


