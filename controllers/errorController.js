module.exports.error = function(req, res){
    return res.render('error',{
        title : 'Error 404'
    });
}