const fs = require("fs");
const path = require("path");
const dataUrl = path.join(__dirname,"../data/tasks.json");
const taskFIle = fs.readFileSync(dataUrl,"utf-8");
const tasks= { 
    index: () => JSON.parse(taskFIle),
    one : function (id)  {
       return this.index().find(tasks => tasks.id == id)
    }
};
module.exports = tasks;