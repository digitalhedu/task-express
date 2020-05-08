const fs = require("fs");
const path = require("path");
const dataUrl = path.join(__dirname,"../data/users.json");
const usersFIle = fs.readFileSync(dataUrl,"utf-8");
const users = { 
    index: () => JSON.parse(usersFIle),
    one : function (id) { return this.index().find(user => user.id == id)}
}
module.exports = users;