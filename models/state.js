const fs = require("fs");
const path = require("path");
const dataUrl = path.join(__dirname,"../data/status.json");
const stateFIle = fs.readFileSync(dataUrl,"utf-8");
const states = {
   index: () => JSON.parse(stateFIle),
   one : function (id) { return this.index().find(st => st.id == id)} 
};
module.exports = states;