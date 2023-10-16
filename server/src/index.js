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

app.delete('/deleteTodo/:id', async (req, res) => {
  const todoId = req.params.id;
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

app.post('/editing/:id', (req, res) => {
  const todoId = req.params.id;
  async function updateTodoById(id, updatedData) {
    try {
      await Todo.findByIdAndUpdate(
        id,
        updatedData,
        { new: true }
      );
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  }
  updateTodoById(todoId, {
    isEditting: true,
  });
})

app.put('/edit/:id', (req, res) => {
  console.log(req.body);
  Todo.findByIdAndUpdate(req.params.id, req.body, {new: true}).then((blog) => {
    res.send(blog);
  })
  console.log(req.body);
})

app.get('/getTodo', (req, res) => {
  Todo.find({}).then((blogs) => {
    res.send(blogs)
  })
})
app.listen(433, () => {
  console.log(`Server is running on port 433.`);
});