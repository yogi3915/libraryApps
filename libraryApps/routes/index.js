const express = require("express")
const router = express.Router()
const bookRouter = require("./books-route")
const userRouter = require("./user-route")
const Controller = require("../controllers/bookControllers")


router.get("/", Controller.getHome)

router.use("/book", bookRouter)
router.use("/user", userRouter)

module.exports = router