const fs = require("fs");
const path = require("path");
const tasks = require("../models/task");
const states = require("../models/state");
const users = require("../models/user");
const data = path.join(__dirname,"../data/tasks.json");

let controller = {

    index: (req,res) => {
        let array = new Array;
        let list = tasks.index();
        list.forEach(item => {
            let task =  tasks.one(item.id);
            task.status =  states.one(task.status);
            task.user = users.one(task.user);
            delete task.user.id;
            delete task.status.id
            array.push(task);
        });

        res.render('index',{list: array});
    },
    detail: (req,res) => {
        let task =  tasks.one(req.params.id);
        task.status =  states.one(task.status);
        task.user = users.one(task.user);
        delete task.user.id;
        delete task.status.id
        res.send(task);
    },
    create: (req,res) => {
        let options = {
            users: users.index(),
            status: states.index(),
            id:  tasks.index().length + 1
        }
        res.render('create',options);
    },
    modify: (req,res) => {
        let list = users.index();
        let status = states.index();
        let task =  tasks.one(req.params.id);
        task.status =  states.one(task.status);
        task.user = users.one(task.user);
        let result = {
            select: task,
            users: list,
            status: status
        };
        res.render('modify',result);
    },
    save: (req,res) => {
        let list = tasks.index();
        let task = req.body;
        list.push(task);
        fs.writeFileSync(data,JSON.stringify(list, null, 4));
        res.redirect(`/task`);
    },
    upload: (req,res) => {
        let list = tasks.index();
        let task =  tasks.one(req.params.id);

        list.forEach(item => {
            if(item.id == task.id){
                item.user = Number(req.body.user);
                item.status = Number(req.body.status);
                item.title = req.body.title;
            }
        });

        fs.writeFileSync(data,JSON.stringify(list, null, 4));
        
        res.redirect("/task");
    },
    delete: (req,res) => {
        let list = tasks.index();
        let task =  tasks.one(req.params.id);
        list.forEach(item => {
            if(item.id == task.id){
                var indice = list.indexOf(item);
                list.splice(indice, 1);
            }
        });
        
        fs.writeFileSync(data,JSON.stringify(list, null, 4));
        
        
        res.redirect(`/task`);
    },

}

module.exports = controller;