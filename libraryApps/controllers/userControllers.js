const { User, Book, UserBook } = require("../models/index")
const toDateFormat = require("../helper/toDateFormat")

class UserController {

    static getListUser(req, res) {
        User.findAll({
            order: [['id', 'ASC']]
        })
        .then(result => {
            // console.log(JSON.stringify(result, null, 2));
            res.render("./user/list-user", { data: result })
        })
        .catch(err => {
            res.send(err)
        })
    }

    static getAddForm(req, res) {

        let errorMessage;
        if(req.query.errors) {
            errorMessage = req.query.errors.split(",")
        }

        res.render("./user/add-user", { error: errorMessage })
    }
    static getAdd(req, res) {
        let objData = {
            username: req.body.username,
            phone_number: req.body.phone_number,
            email: req.body.email,
            address: req.body.address,
            role: req.body.role
        }
        User.create(objData)
        .then(() => {
            res.redirect("/user")
        })
        .catch(err => {
            res.redirect(`/user/add?errors=${err.message}`)
        })
    }

    static getDeleteUser(req, res){
        let newId = +req.params.id
        User.destroy({
            where: {
                id: newId
            }
        })
        .then(() => {
            res.redirect("/user")
        })
        .catch(err => {
            res.send(err)
        })
    }

    static getEditForm(req, res) {

        let errorMessage;
        if(req.query.errors) {
            errorMessage = req.query.errors.split(",")
        }
        let newId = req.params.id
        User.findByPk(newId)
        .then(result => {
            res.render("./user/edit-user", { data: result, error: errorMessage})
        })
        .catch(err =>{
            res.send(err)
        })
    }

    static getEdit(req, res) {

        let objData = {
            username: req.body.username,
            phone_number: req.body.phone_number,
            email: req.body.email,
            address: req.body.address,
            role: req.body.role
        }
        User.update(objData, {
            where: {
                id : +req.params.id
            }
        })
        .then(() =>{
            res.redirect("/user")
        })
        .catch(err => {
            res.redirect(`/user/edit/${req.params.id}?errors=${err.message}`)
        })
    }

    static addBookForm(req, res) {

        let newId = +req.params.id

        let dataUser;
        User.findByPk(newId, {
            include: [Book]
        })
        .then(result => {
            console.log(JSON.stringify(result, null, 2));
            dataUser = result
            return Book.findAll()
        })
        .then(resultBook => {
            res.render("./user/add-book-to-user", {user: dataUser, book: resultBook, toDateFormat})
        })
        .catch(err => {
            res.send(err)
        })
    } 

    static userAddBook(req, res) {
        let objData = {
            UserId: +req.params.id,
            BookId: +req.body.BookId,
            return_date: new Date(),
            booking_date: new Date()
        }
        UserBook.create(objData)
        .then(() => {
            res.redirect(`/user/addBook/${+req.params.id}`)
        })
        .catch(err => {
            res.send(err)
        })
    }
}

module.exports = UserController