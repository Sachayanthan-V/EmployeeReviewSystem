module.exports.home = function(req, res) {
    return res.render('home', {
        title : "home page"
    });
}

module.exports.login = function(req, res) {
    return res.render('login', {
        title : 'login page'
    });
}

module.exports.register = function(req, res) {
    return res.render('register', {
        title : 'login page'
    });
}