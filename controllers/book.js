
const Book = require('../models/Book')

exports.getBooks = async(req, res) => {
    const book = await Book.find();
    
    if(book){
        return res.status(200).json({
            status: true,
            message: 'success get books',
            data: book
        })
    }

    return res.status(500).json({
        status: false,
        message: 'Server error',
    })
}

exports.createBook = async (req, res) => {

    const checkBook = await Book.findOne({name: req.body.author})

    if(checkBook){
        return res.status(400).json({
            status: false,
            message: 'book already on database'
        })
    }

    const book = new Book(req.body);

    await book.save((err, book) =>{
        if(err) {
            return res.status(400).json({
                status: false,
                message: 'error save book'
            })
        }

        return res.status(200).json({
            status: true,
            message: 'success save book',
            data: book
        })
    })
}

exports.findBook =  async (req, res) => {
    const book = await Book.findOne({name: req.params.author})

    if(book){
        return res.status(200).json({
            status: true,
            message: 'success find book',
            data: book
        })
    }

    return res.status(500).json({
        status: false,
        message: 'server error'
    })
}