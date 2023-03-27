const { User } = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.post_login = async function(req, res){
  const { email, password } = req.body

  let user = await User.findOne({ email: email })
  if(!user){
    return res.status(400).json({ error: "Email veya parola hatalı." })
  }

  const isSuccess = await bcrypt.compare(password, user.password)
  if(!isSuccess){
    return res.status(400).json({ error: "Email veya parola hatalı." })
  }

  const token = jwt.sign({
    _id: user._id,
    email: user.email
  }, "jwtPrivateKey")

  res.cookie("auth_token", token)
  
  return res.status(200).json(true)
}

exports.get_login = async function(req, res){
  res.render("user/login")
}

exports.post_register = async function(req, res){
  const { username, email, password } = req.body

  let user = await User.findOne({ email: email })
  if(user){
    return res.status(400).json({ email: "Bu email kullanılmaktadır." })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  user = new User({
    username: username,
    email: email,
    password: hashedPassword
  })

  try{
    await user.save()
    return res.status(200).json(true)
  }catch(err){
    return res.status(400).json({ error: err })
  }
}

exports.get_register = async function(req, res){
  res.render("user/register")
}

exports.get_index = async function(req, res){
  res.render("user/index")
}