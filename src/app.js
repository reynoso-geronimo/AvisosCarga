require('dotenv').config()
const express = require("express");
const path = require("path");
const methodOverride = require('method-override');
const mainRoute = require("./routes/mainRoute.js")

const port = process.env.port||3000

const app = express();

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(methodOverride('_method'))

app.set("view engine", "ejs")
app.set('views', path.resolve(__dirname,'../views'))
app.use(express.static(path.resolve(__dirname, "./../public")));

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});

app.use(mainRoute)