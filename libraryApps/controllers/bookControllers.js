const { Book, User } = require("../models/index")

class BookController {

    static listBookFromUser(req,res) {
        Book.findAll({
            order: [ ['id', 'ASC'] ]
        })
        .then(result => {
            res.render("books-user", { data: result })
        })
        .catch(err => {
            res.send(err)
        })
    }
    

    static getListBook(req, res) {
        Book.findAll({
            order: [ ['id', 'ASC'] ]
        })
        .then(result => {
            res.render("./book/list-book", { data: result })
        })
        .catch(err => {
            res.send(err)
        })
    }

    static getAddBookForm(req, res) {
        let errorMessage;

        if(req.query.errors) {
            errorMessage = req.query.errors.split(",")
        }
        res.render("./book/add-book", {error: errorMessage})
    }


    static getAddBook(req, res) {

        let objData = {
            title: req.body.title,
            released_date: req.body.released_date,
            stock: req.body.stock,
            author: req.body.author
        }
        Book.create(objData)
        .then(() => {
            res.redirect("/book")
        })
        .catch(err => {
           
            res.redirect(`/book/add/?errors=${err.message}`)
        })
    }

    static getDeleteBook(req, res) {
        let newId = +req.params.id

        Book.destroy({
            where: {
                id: newId
            }
        })
        .then(() => {
            res.redirect("/book")
        })
        .catch(err => {
            res.send(err)
        })
    }


    static getEditBookForm(req, res) {
        let errorMessage;

        if(req.query.errors) {
            errorMessage = req.query.errors.split(",")
        }

        let newId = +req.params.id
        Book.findByPk(newId)
        .then(result => {
          
            res.render("./book/edit-book", { data: result, error: errorMessage })
        })
        .catch(err => {
            res.send(err)
        })
    }


    static getEditBook(req, res) {
        let newId = +req.params.id
        let objData = {
            title: req.body.title,
            released_date: req.body.released_date,
            stock: req.body.stock,
            author: req.body.author,
            price: +req.body.price
        }

        Book.update(objData, {
            where: {
                id: newId
            }
        })
        .then(() => {
            res.redirect("/book")
        })
        .catch(err => {
            res.redirect(`/book/edit/${newId}?errors=${err.message}`)
        })
    }
}

module.exports = BookController