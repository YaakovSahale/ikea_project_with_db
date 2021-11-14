const express = require(`express`);
const { appendFile } = require("fs");
const APP = express();
const path = require(`path`);
const utils = require(`./utils`);
const dotenv = require(`dotenv`);
dotenv.config();

const PORT = process.env.PORT || 8080;
const publicPath = path.join(__dirname, "..", "public");

APP.use(express.static(publicPath));
APP.use(express.json());

//products routes

APP.get("/products", (req, res) => {
  utils.getAll(req, res);
});

APP.post(`/products`, (req, res) => {
  utils.postProduct(req, res);
});

APP.delete(`/products/:id`, (req, res) => {
  utils.deleteProduct(req, res);
});

APP.patch(`/products/:id`, (req, res) => {
  utils.patchProduct(req, res);
});

//cart routes

APP.patch("/shopCart", (req, res) => {
  utils.addProductToCart(req, res);
});

APP.patch("/cartProduct/:id", (req, res) => {
  utils.deleteCartProduct(req, res);
});

APP.post("/addShopCart", (req, res) => {
  utils.addCart(req, res);
});

APP.get("/shopCart", (req, res) => {
  utils.getCartProducts(req, res);
});

//contact routes

APP.post(`/contact`, (req, res) => {
  utils.addContact(req, res);
});

APP.get(`/contacts`, (req, res) => {
  utils.getAllContacts(req, res);
});

//.............................

APP.listen(PORT, () => {
  console.log(`server is listens on port: ${PORT}`);
});
