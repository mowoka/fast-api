const express = require('express');
const {getBooks, createBook, findBook} = require('../controllers/book')

const router = express.Router();

router.get('/books', getBooks)
router.post('/book', createBook)
router.get('/book/:author', findBook)

module.exports = router;