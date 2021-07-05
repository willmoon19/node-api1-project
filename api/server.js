// BUILD YOUR SERVER HERE
const express = require('express');
const Users = require('./users/model');

const server = express();

server.use(express.json());


server.post('/api/users', (req, res) => {
    console.log(req.body.name)
    if (!req.body.name || !req.body.bio){
        res.status(400).json({ message: "Please provide name and bio for the user" })
    } else {    
        const { name, bio } = req.body
        Users.insert({ name, bio })
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message
                })
            })
    }
})

server.get('/api/users', (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({
                message: "The users information could not be retrieved",
                error: err.message
            })
        })
})

server.get('/api/users/:id', (req, res) => {
    Users.findById(req.params.id)
        .then(user => {
            if (!user){
                res.status(404).json({ message: "The user with the specified ID does not exist" })
            } else {
                res.status(200).json(user)
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "The user information could not be retrieved",
                error: err.message
            })
        })
})

server.delete('/api/users/:id', (req, res) => {
    Users.remove(req.params.id)
        .then(user => {
            if (!user){
                res.status(404).json({ message: "The user with the specified ID does not exist" })
            } else {
                res.json(user)
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "The user could not be removed",
                error: err.message
            })
        })
})

server.put('/api/users/:id', (req, res) => {
    console.log('sup')
})




module.exports = server; // EXPORT YOUR SERVER instead of {}
