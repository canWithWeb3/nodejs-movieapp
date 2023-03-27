const router = require("express").Router()
const userController = require("../controllers/userController")

router.post("/login", userController.post_login)

router.get("/login", userController.get_login)

router.post("/register", userController.post_register)

router.get("/register", userController.get_register)

router.get("/", userController.get_index)

module.exports = router