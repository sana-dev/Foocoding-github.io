const fs = require('fs');
const path = require('path');
const models=require('./../models/todoModel')

const todosFilePath = path.join(process.cwd(), 'data', 'todos.json');

function readTodosFromFile() {
  const todosData = fs.readFileSync(todosFilePath);
  return JSON.parse(todosData);
}

function writeTodosToFile(todos) {
  fs.writeFileSync(todosFilePath, JSON.stringify(todos, null, 2));
}

const todoController = {
  createTodo: (req, res) => {
    try {
      const { title, description, completed } = req.body;

      if (!title || !description || !completed) {
        return res.status(400).json({ error: 'Title, description, and completed are required.' });
      }

      const todos = readTodosFromFile();
      const newTodoId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;

      const newTodo = { id: newTodoId, title, description, completed };

      todos.push(newTodo);
      writeTodosToFile(todos);

      res.status(201).json(newTodo);
    } catch (error) {
      console.error('Error creating todo:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getTodos: (req, res) => {
    try {
      const todos = readTodosFromFile();
      res.json(todos);
    } catch (error) {
      console.error('Error getting todos:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getTodoById: (req, res) => {
    try {
      const todos = readTodosFromFile();
      const todo = todos.find(todo => todo.id === parseInt(req.params.id));

      if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
      }

      res.json(todo);
    } catch (error) {
      console.error('Error getting todo by ID:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updateTodo: (req, res) => {
    try {
      const { title, description, completed } = req.body;

      if (!title || !description || completed === undefined) {
        return res.status(400).json({ error: 'Title, description, and completed are required.' });
      }

      let todos = readTodosFromFile();
      const todoIndex = todos.findIndex(todo => todo.id === parseInt(req.params.id));

      if (todoIndex === -1) {
        return res.status(404).json({ error: 'Todo not found' });
      }

      todos[todoIndex] = { ...todos[todoIndex], title, description, completed };
      writeTodosToFile(todos);

      res.json(todos[todoIndex]);
    } catch (error) {
      console.error('Error updating todo:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteTodo: (req, res) => {
    try {
      let todos = readTodosFromFile();
      const todoIndex = todos.findIndex(todo => todo.id === parseInt(req.params.id));

      if (todoIndex === -1) {
        return res.status(404).json({ error: 'Todo not found' });
      }

      const deletedTodo = todos.splice(todoIndex, 1)[0];
      writeTodosToFile(todos);

      res.json(deletedTodo);
    } catch (error) {
      console.error('Error deleting todo:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

module.exports = todoController;
