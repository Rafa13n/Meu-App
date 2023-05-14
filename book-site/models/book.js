const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:senha@localhost:5432/book_site');

const Book = sequelize.define('book', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  author: {
    type: Sequelize.STRING,
    allowNull: false
  },
  genre: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  cover: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Book;
