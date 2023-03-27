const express = require("express")
const mongoose = require("mongoose")
const path = require("path")
const cookieParser = require("cookie-parser")
require("dotenv").config()

const app = express()

app.use(express.urlencoded({urlencoded: true}))
app.use(express.json())
app.use(cookieParser())

app.set("view engine", "ejs")

app.use("/libs", express.static(path.join(__dirname, "node_modules")))
app.use("/static", express.static(path.join(__dirname, "public")))

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(`Database connected`))
  .catch(err => console.log(`Database connect error: ${err}`))


const adminRoutes = require("./routes/admin")
const userRoutes = require("./routes/user")

app.use("/admin", adminRoutes)
app.use(userRoutes)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`))