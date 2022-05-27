const express = require("express");
const getProducts = require("./Controllers/getData");
const productsData = getProducts();
const app = express();
const PORT = 3000;

app.use((req, res, next) => {
  console.log("Running middleware function!!!");
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", "./Views");

app.get("/", (req, res) => {
  res.render("home", {
    pageTitle: "Home Page",
    pageHeader: "Welcome To the STORE",
  });
});

app.get("/products", (req, res) => {
  res.render("products", {
    data: productsData,
    pageTitle: "Products Page",
  });
});

app.get("/products/new", (req, res) => {
  res.render("new-products");
});

app.get("/product/:id", (req, res) => {
  res.render("item", { data: productsData[req.params.id - 1] });
});

app.post("/products", (req, res) => {
  productsData.push(req.body);
  res.redirect("/products");
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
