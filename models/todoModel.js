// todoModel.js
const { v4: uuidv4 } = require('uuid');

class TodoSchema {
  constructor(title, description) {
    this.id = uuidv4();
    this.title = title;
    this.description = description;
  }
}

module.exports = TodoSchema;

    