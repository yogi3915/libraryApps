const express = require("express")
const router = express.Router()
const Controller = require("../controllers/userControllers")

const cekAdmin = require("../midleware/cekadmin")
router.use(cekAdmin)

router.get("/", Controller.getListUser)
router.get("/add", Controller.getAddForm)
router.post("/add", Controller.getAdd)
router.get("/delete/:id", Controller.getDeleteUser)
router.get("/edit/:id", Controller.getEditForm)
router.post("/edit/:id", Controller.getEdit)
router.get("/addBook/:id", Controller.addBookForm)
router.post("/addBook/:id", Controller.userAddBook)
router.get("/addBook/:userId/flag_return/:bookId", Controller.getFlagReturn)

router.get("/addAdminUser", Controller.getAddAdminUser)
router.post("/addAdminUser", Controller.postAddAdminUser)

router.get("/send-email/:id", Controller.sendEmail)


module.exports = router