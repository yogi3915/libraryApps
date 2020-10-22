const express = require("express")
const app = express()
const port = 3000

const session = require('express-session')

const routes = require("./routes/index")

app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: false }))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {}
}))


app.use("/",routes)

app.listen(port, () => {
    console.log(`app listen on port ${port}`);
})