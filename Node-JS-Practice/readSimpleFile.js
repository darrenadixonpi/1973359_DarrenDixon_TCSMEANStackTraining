let fs = require("fs"); //loaded core fs module
let msg = fs.readFileSync("simpleFile.txt");
console.log(msg.toString());
