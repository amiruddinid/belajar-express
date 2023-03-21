const express = require("express");
const app = express();
const Book = require("./book");
const uploadMemory = require("./middleware/uploadMemory");
const uploadDisk = require("./middleware/uploadDisk")
const cloudinary = require("./config/cloudinary");
const Motors = require("./motor");
const { PORT = 8000 } = process.env;

//Book.js tambahkan module.exports = Book
//tambahkan property .length di this.constructor.records jadi
//const lastRecordId =
// this.constructor.records[this.constructor.records.length - 1]

app.use(express.static("public"))
app.use(express.json())


//list
app.get('/api/v1/motors', async (req, res) => {
    try {
        const motors = await Motors.list();
        res.status(200).json(motors)
    } catch (error) {
        res.status(400).json({
            message: "Error",
            data: error
        })
    }
    
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
app.post('/api/v1/motors', async (req, res) => {
    try {
        const motors = await Motors.create(req.body);
        res.status(201).json({
            message: "Sukses",
            data: motors
        })
    } catch (error) {
        res.status(400).json({
            message: "Error",
            data: error
        })
    }
    
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
app.post('/api/v1/upload/', uploadDisk.single("picture"), (req, res) => {
    const url = `/uploads/${req.file.filename}`;
    res
      .status(200)
      .json({ message: "Foto berhasil di-upload, silahkan cek URL", url });
})

app.post('/api/v1/upload/cloudinary', uploadMemory.single("picture"), (req, res) => {
    const fileBase64 = req.file.buffer.toString("base64")
    const file = `data:${req.file.mimetype};base64,${fileBase64}`
    
    cloudinary.uploader.upload(file, (err, result) => {
        if(!!err){
            console.log(err)
            return res.status(400).json({
                message: "Gagal upload file"
            })
        }

        res.status(201).json({
            message: "Upload file berhasil",
            url: result.url
        })
    })
})

app.use((req, res) => {
    res.status(404).send("Mau kemana bos?")
})

app.listen(PORT, () => {
    console.log(`Server nyala di http://localhost:${PORT}`)
})