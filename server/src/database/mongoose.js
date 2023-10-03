const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/todoApp',
{
    useNewUrlParser: true,
    UseUnifiedTopology: true
});