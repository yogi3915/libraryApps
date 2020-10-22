const express = require("express")
const router = express.Router()
const bookRouter = require("./books-route")
const userRouter = require("./user-route")
const Controller = require("../controllers/loginControllers")
const Controllers = require("../controllers/bookControllers")

router.get("/books-user", Controllers.listBookFromUser)

router.get("/", Controller.getHome)
router.get("/login", Controller.getLoginForm)
router.post("/login", Controller.postLogin)
router.get("/logout", Controller.getLogout)

router.use("/book", bookRouter)
router.use("/user", userRouter)

module.exports = router