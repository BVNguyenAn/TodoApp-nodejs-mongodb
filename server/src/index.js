require('./database/mongoose')
const express = require("express");
const cors = require("cors");
const Todo = require('./models/todo')

const app = express();

app.use(cors());
app.use(express.json());

app.post('/todo', (req, res) => {
  const todo = new Todo(req.body)
  todo.save().then((todo) => {
    console.log(`added: ${todo.todo}`);
    res.status(201).send(todo)
  }).catch((err) => {
    res.status(400).send(err)
  })
})

app.post('/deleteTodo', async (req, res) => {
  const todoId = req.body.id;
  try {
    const result = await Todo.deleteOne({ _id: todoId });
    if (result.deletedCount === 1) {
      console.log('deleted:', todoId);
      res.status(200).send('Todo deleted successfully');
    } else {
      console.log('notfound:', todoId);
      res.status(404).send('Todo not found');
    }
  } catch (err) {
    console.error('err:', err);
    res.status(500).send('Error deleting todo');
  }
});

app.get('/getTodo', (req, res) => {
  Todo.find({}).then((blogs) => {
    res.send(blogs)
  })
})
app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});