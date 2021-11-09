const express = require(`express`);
const APP = express();
const PORT = 8080;
const path = require(`path`)
const utils = require(`./utils`);
const publicPath = path.join(__dirname, "..", "public")

APP.use(express.static(publicPath))
APP.use(express.json());




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

APP.get("/shopCart", (req, res) => {
  utils.getAll(req, res);
});


APP.listen(PORT, () => {
  console.log(`server is listens on port: ${PORT}`);
});
