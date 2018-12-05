const fs = require('fs');
let stat = fs.statSync("D:\LocalCloud\\myCloudSite\\src\\body\\card.js");
if (stat.isFile()) {
    console.log(
        "name", stat.name,"type", "f","size", stat.size,"la", stat.mtime,"lm", stat.ctime, "birth",stat.birthtime);
}