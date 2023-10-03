const mongoose = require('mongoose');
 
const todoSchema = new mongoose.Schema({
    todo: String,
    isEditting: Boolean
});
const listTodo = mongoose.model('Todo', todoSchema); 
module.exports = listTodo;