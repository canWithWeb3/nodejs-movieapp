const router = require("express").Router()
const adminController = require("../controllers/adminController")

// router.delete("/categories/:movieId/delete", adminController.delete_movie)
// router.post("/movies/:movieId/edit", adminController.post_edit_movie)
// router.get("/movies/:movieId/edit", adminController.get_edit_movie)
// router.post("/movies/create", adminController.post_create_movie)
router.get("/movies/create", adminController.get_create_movie)
router.get("/movies", adminController.get_movies)

router.delete("/categories/:categoryId/delete", adminController.delete_category)
router.post("/categories/:categoryId/edit", adminController.post_edit_category)
router.get("/categories/:categoryId/edit", adminController.get_edit_category)
router.post("/categories/create", adminController.post_create_category)
router.get("/categories/create", adminController.get_create_category)
router.get("/categories", adminController.get_categories)


router.get("/", adminController.get_admin)

module.exports = router