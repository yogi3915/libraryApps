function cekAdmin(req, res, next) {

    if(!req.session.role) {
        res.redirect("/")
    }

    else if (req.session.role !== "admin") {
      next()

    } else {
        next()
    }

}

module.exports = cekAdmin