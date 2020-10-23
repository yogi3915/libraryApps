const { User, Book, UserBook } = require("../models/index")
const toDateFormat = require("../helper/toDateFormat")
const bcrypt = require('bcrypt');
const saltRounds = 10;
const nodemailer = require('nodemailer');

class UserController {

    static getListUser(req, res) {
        User.findAll({
            order: [['id', 'ASC']]
        })
        .then(result => {
            
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
            booking_date: new Date(),
            flag_return: false
        }
        UserBook.create(objData)
        .then(() => {                
            return Book.decrement('stock', { where: {id : objData.BookId}})
        })
        .then(result => {
            res.redirect(`/user/addBook/${+req.params.id}`)
        })
        .catch(err => {
            res.send(err)
        })
    }

    static getAddAdminUser(req, res) {
        res.render("./user/addAdminUser")
    }

    static postAddAdminUser(req, res) {
        let objData = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        }
        
        bcrypt.hash(objData.password, saltRounds)
        .then((hash) => {
            objData.password = hash
            return User.create(objData)
        })
        .then(() => {
            res.redirect("/user")
        })
        .catch(err => {
            res.send(err)
        })
    }

    static getFlagReturn(req, res) {
        let usrId = +req.params.userId
        let bkId = +req.params.bookId

        UserBook.findOne({
            where: {
                
                UserId: usrId,
                BookId: bkId
            }
        })
        .then(result => {

          return UserBook.update({flag_return : true }, {
                where: {
                    UserId: usrId,
                    BookId: bkId
                },
                returning: true
            })
        })
        .then((result) => {
            
            return Book.increment("stock", {where: {id: bkId}})
        })
        .then((result) => {
            
            res.redirect(`/user/addBook/${usrId}`)
        })
        .catch(err => {
            res.send(err)
        })
    }

    static sendEmail(req, res) {

        let newId =  +req.params.id

        User.findOne({where: {id: newId}, include: [Book]})
        .then(result => {


            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'toko.kesusu@gmail.com',
                    pass: 'tokokesusu123'
                }
            });

            let sendText = `Terima kasih sudah datang ke toko peminjaman buku kami,
            silahkan kembalikan buku sebelum tanggal jatuh tempo,
            buku yang anda pinjam `

            let dataBuku = result.Books.map(el => {
                return `judul buku: ${el.title}; price: ${el.price} , `
            })

            sendText += dataBuku

            let mailOptions = {
                from: 'toko.kesusu@gmail.com',
                to: `${result.email}`,
                subject: 'receipe.noreply',
                text: `${sendText}`
            };

            transporter.sendMail(mailOptions, (err, info) => {
                if (err) throw err;
                console.log('Email sent: ' + info.response);
            });
            res.redirect("/user")

        })
        .catch(err => {
            res.send(err)
        })
    }
}

module.exports = UserController