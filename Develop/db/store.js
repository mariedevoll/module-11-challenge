const utl = require("util");
const fs = require("fs");
const uuidv1 = require("uuid/v1");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store  {
    read() {}
}
