const express = require("express")
const router = express.Router()
const Controller = require("../controllers/bookControllers")
const { Book } = require("../models/index")

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() +
        path.extname(file.originalname));
    }
});



const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true)
        } else {
            cb(null, false);
            return cb(new Error('Allowed only jpg, png and jpeg'));
        }
    }
})

router.get("/", Controller.getListBook)
router.get("/add", Controller.getAddBookForm)
router.post("/add", upload.single('coverImage'), (req, res) => {
    let objData = {
        title: req.body.title,
        released_date: req.body.released_date,
        stock: req.body.stock,
        author: req.body.author,
        coverImage: req.file.filename
    }
    Book.create(objData)
        .then(() => {
            res.redirect("/book")
        })
        .catch(err => {
            res.redirect(`/book/add/?errors=${err.message}`)
        })
})
router.get("/delete/:id", Controller.getDeleteBook)
router.get("/edit/:id", Controller.getEditBookForm)
router.post("/edit/:id", Controller.getEditBook)

module.exports = router