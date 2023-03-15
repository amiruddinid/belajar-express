const express = require("express");
const app = express();
const Book = require("./book");
const { PORT = 8000 } = process.env;

//Book.js tambahkan module.exports = Book
//tambahkan property .length di this.constructor.records jadi
//const lastRecordId =
// this.constructor.records[this.constructor.records.length - 1]

app.use(express.json())

//list
app.get('/api/v1/books', (req, res) => {
    const books = Book.list();
    res.status(200).json(books)
})
//detail
app.get('/api/v1/books/:id', (req, res) => {
    const book = Book.find(req.params.id);
    if(!book) res.status(404).json({
        error: "Book not found"
    })  
    res.status(200).json(book)
})
//create
app.post('/api/v1/books', (req, res) => {
    const books = Book.create(req.body);
    res.status(201).json({
        message: "Sukses",
        data: books
    })
})
// //update / edit
// app.put('/api/v1/books/:id',)
// //delete
// app.delete('/api/v1/books/', )

app.use((req, res) => {
    res.status(404).send("Mau kemana bos?")
})

app.listen(PORT, () => {
    console.log(`Server nyala di http://localhost:${PORT}`)
})