const Book = require('../models/book');

// Retorna todos os livros
exports.getAllBooks = (req, res) => {
  Book.findAll()
    .then(books => {
      res.status(200).json(books);
    })
    .catch(err => {
      res.status(500).json({
        message: err.message || "Ocorreu um erro ao buscar os livros."
      });
    });
};

// Cria um novo livro
exports.createBook = (req, res) => {
  if (!req.body.title || !req.body.author || !req.body.genre || !req.body.description || !req.body.cover) {
    res.status(400).json({
      message: "Os campos título, autor, gênero, descrição e capa são obrigatórios."
    });
    return;
  }

  const book = {
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    description: req.body.description,
    cover: req.body.cover
  };

  Book.create(book)
    .then(data => {
      res.status(201).json(data);
    })
    .catch(err => {
      res.status(500).json({
        message: err.message || "Ocorreu um erro ao criar o livro."
      });
    });
};

// Busca um livro pelo ID
exports.getBookById = (req, res) => {
  const id = req.params.id;

  Book.findByPk(id)
    .then(book => {
      if (book) {
        res.status(200).json(book);
      } else {
        res.status(404).json({
          message: `Não foi possível encontrar o livro com o ID ${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: err.message || `Ocorreu um erro ao buscar o livro com o ID ${id}.`
      });
    });
};

// Atualiza um livro pelo ID
exports.updateBook = (req, res) => {
  const id = req.params.id;

  Book.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).json({
          message: "Livro atualizado com sucesso."
        });
      } else {
        res.status(404).json({
          message: `Não foi possível atualizar o livro com o ID ${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: err.message || `Ocorreu um erro ao atualizar o livro com o ID ${id}.`
      });
    });
};

// Remove um livro pelo ID
exports.deleteBook = (req, res) => {
  const id = req.params.id;

  Book.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).json({
          message: "Livro removido com sucesso."
        });
      } else {
        res.status(404).json({
          message: `Não foi possível remover o livro com o ID ${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: err.message || `Ocorreu um erro ao remover o livro com o ID ${id}.`
      });
    });
};
