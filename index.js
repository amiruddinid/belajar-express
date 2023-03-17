const express = require("express");
const app = express();
const Book = require("./book");
const upload = require("./middleware/upload");
const { PORT = 8000 } = process.env;

//Book.js tambahkan module.exports = Book
//tambahkan property .length di this.constructor.records jadi
//const lastRecordId =
// this.constructor.records[this.constructor.records.length - 1]

app.use(express.static("public"))
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
// update / edit
app.put('/api/v1/books/:id', (req, res) => {
    const book = Book.find(req.params.id)
    if(!book) return res.status(404).json({
        error: "Book Not Found"
    })

    book.update(req.body)
    res.status(200).json(book);
})
// delete
app.delete('/api/v1/books/:id', (req, res) => {
    const book = Book.find(req.params.id)
    if(!book) return res.status(404).json({
        error: "Book Not Found"
    })

    book.delete()
    res.status(204).end();
})
// upload
app.post('/api/v1/upload/', upload.single("picture"), (req, res) => {
    const url = `/uploads/${req.file.filename}`;
    res
      .status(200)
      .json({ message: "Foto berhasil di-upload, silahkan cek URL", url });

})

app.use((req, res) => {
    res.status(404).send("Mau kemana bos?")
})

app.listen(PORT, () => {
    console.log(`Server nyala di http://localhost:${PORT}`)
})