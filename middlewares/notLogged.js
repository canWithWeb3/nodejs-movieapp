module.exports = function(req, res, next){
  if(!req.cookies.isAuth){
    return res.redirect("/login")
  }

  res.locals.isAuth = req.cookies.isAuth
  next()
}