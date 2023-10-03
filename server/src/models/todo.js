const mongoose = require('mongoose');
 
const todoSchema = new mongoose.Schema({
    todo: String
});
const listTodo = mongoose.model('Todo', todoSchema); 
module.exports = listTodo;