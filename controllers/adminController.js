const { Movie } = require("../models/Movie")
const { Category } = require("../models/Category")


exports.get_create_movie = async (req, res) => {
  const categories = await Category.find()

  return res.render("admin/movies/create-movie", {
    categories: categories
  })
}

exports.get_movies = async (req, res) => {
  const movies = await Movie.find();

  return res.render("admin/movies/movies", {
    movies: movies
  })
}



exports.delete_category = async (req, res) => {
  const { categoryId } = req.params
  if(!categoryId){
    return res.status(400).json({ error: "Böyle bir kategori yok." })
  }

  let category = await Category.findById(categoryId)
  if(!category){
    return res.status(400).json({ error: "Böyle bir kategori yok." })
  }
  
  try{
    await Category.findByIdAndDelete(categoryId)
    return res.status(200).json(true)
  }catch(err){
    return res.status(400).json({ error: err })
  }
}

exports.post_edit_category = async (req, res) => {
  const { name } = req.body

  let category = await Category.findById(req.params.categoryId)

  if(!category){
    return res.redirect("/admin/categories")
  }

  category.name = name

  try{
    await category.save()
    return res.status(200).json(true)
  }catch(err){
    return res.status(400).json({ error: err })
  }
}

exports.get_edit_category = async (req, res) => {
  const category = await Category.findById(req.params.categoryId)

  if(!category){
    return res.redirect("/admin/categories")
  }

  return res.render("admin/categories/edit-category", {
    category: category
  })
}

exports.post_create_category = async (req, res) => {
  const { name } = req.body

  let category = new Category({
    name: name
  })

  try{
    await category.save()
    return res.status(200).json(true)
  }catch(err){
    return res.status(400).json({ error: err })
  }
}

exports.get_create_category = async (req, res) => {
  return res.render("admin/categories/create-category")
}

exports.get_categories = async (req, res) => {
  const categories = await Category.find();

  return res.render("admin/categories/categories", {
    categories: categories
  })
}

exports.get_admin = async (req, res) => {
  return res.render("admin/admin")
}