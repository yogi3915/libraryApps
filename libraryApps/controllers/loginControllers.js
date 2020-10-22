const { User } = require("../models/index")
const bcrypt = require('bcrypt');
const saltRounds = 10;

class Controllers {
    static getHome(req, res) {
        if (req.session.islogin == true) {
            res.render("home")
        } else {
            res.redirect("/login")
        }
    }

    static getLoginForm(req, res) { 
        
        let err;
        if (req.query.err) {
            err = req.query.err
        }

        if(req.session.islogin == true) {
            res.redirect("/")
        } else {
            res.render("login", {errorMessage: err})
        }
    }

    static postLogin(req, res){

        let uname = req.body.uname
        let psw = req.body.psw

        User.findOne({
            where: {
                username: uname,
            }
        })
        .then(result => {

            bcrypt.compare(psw, result.password)
            .then(dataPsw => {
                if (dataPsw == true) {
                    
                    req.session.islogin = true
                    req.session.userId = result.userId
                    req.session.username = result.username
                    req.session.role = result.role
                    
                    res.redirect("/")
                } else {
                    res.redirect("/login?err=Username / Password is wrong..!")
                }
            })
        })
        .catch(err => {
            res.send(err)
        })
    }

    static getLogout(req, res){
        req.session.destroy((err) => {
            if (err) {
                res.send(err)
            } else {
                res.redirect("/login")
            }
        })
    }


}

module.exports = Controllers