const express = require('express')
const app = express();
const mongoose = require('./database/mongoose');

const List = require('./database/models/list');
const Task = require('./database/models/task');
app.use(express.json());

/**
 * Enable CORS
 */
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods","GET, POST,HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/lists',(req,res) => {
    List.find({})
        .then(lists => res.send(lists))
        .catch((error) => console.log(error))
});

app.post('/lists',(req,res) => {
    (new List({ 'title': req.body.title }))
    .save()
    .then((list) => res.send(list))
});

app.get('/lists/:listid',(req,res) => {
    List.find({ _id:req.params.listId })
        .then(lists => res.send(lists))
        .catch((error) => console.log(error))
});

app.patch('/lists/:listid',(req,res) => {
    List.findOneAndUpdate({ _id:req.params.listId }, {$set: req.body})
        .then(lists => res.send(lists))
        .catch((error) => console.log(error))
});

app.delete('/lists/:listid',(req,res) => {
    List.findOneAndDelete( req.params.listId )
        .then(lists => res.send(lists))
        .catch((error) => console.log(error))
});

app.get('http://localhost:3000/lists/:listid/tasks',(req,res) => {
    Task.find({ _id:req.params.listId })
        .then(tasks => res.send(tasks))
        .catch((error) => console.log(error))
});

app.post('/lists/:listId/tasks',(req,res) => {
    (new Task({ '_listId': req.params.listId, 'title': req.body.title }))
    .save()
    .then((task) => res.send(task))
    .catch((error) => console.log(error))
});

app.get('/lists/:listId/tasks/:taskId',(req,res) => {
    Task.findOne({_listId: req.params.listId, _id: req.params.taskId })
    .then((task) => res.send(task))
    .catch((error) => console.log(error))
});

app.patch('/lists/:listId/tasks/:taskId',(req,res) => {
    Task.findOneAndUpdate({_listId: req.params.listId, _id: req.params.taskId }, {$set: req.body})
    .then((task) => res.send(task))
    .catch((error) => console.log(error))
});

app.delete('/lists/:listId/tasks/:taskId',(req,res) => {
    Task.findOneAndDelete({_listId: req.params.listId, _id: req.params.taskId })
    .then((task) => res.send(task))
    .catch((error) => console.log(error))
});

app.listen(3000, () => console.log("Server connected on port JSON"));

