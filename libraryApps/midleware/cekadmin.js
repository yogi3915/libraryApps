function cekAdmin(req, res, next) {

    if(!req.session.role) {
        res.redirect("/")
    }

    else if (req.session.role !== "admin") {
        res.redirect("/book/books-user")

    } else {
        next()
    }

}

module.exports = cekAdmin