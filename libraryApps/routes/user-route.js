const express = require("express")
const router = express.Router()
const Controller = require("../controllers/userControllers")

router.get("/", Controller.getListUser)
router.get("/add", Controller.getAddForm)
router.post("/add", Controller.getAdd)
router.get("/delete/:id", Controller.getDeleteUser)
router.get("/edit/:id", Controller.getEditForm)
router.post("/edit/:id", Controller.getEdit)
router.get("/addBook/:id", Controller.addBookForm)
router.post("/addBook/:id", Controller.userAddBook)


module.exports = router