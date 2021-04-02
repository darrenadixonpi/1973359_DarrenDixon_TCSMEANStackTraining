let fs = require("fs"); //loaded core fs module
let msg = "\nWelcome to Node JS FS module to store data in a file numba 2";
fs.writeFileSync("simpleFile.txt", msg,{flag:"a"});
console.log("Data stored in file successfully.");
