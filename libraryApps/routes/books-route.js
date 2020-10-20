const express = require("express")
const router = express.Router()
const Controller = require("../controllers/bookControllers")

router.get("/", Controller.getListBook)
router.get("/add", Controller.getAddBookForm)
router.post("/add", Controller.getAddBook)
router.get("/delete/:id", Controller.getDeleteBook)
router.get("/edit/:id", Controller.getEditBookForm)
router.post("/edit/:id", Controller.getEditBook)

module.exports = router