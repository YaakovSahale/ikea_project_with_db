require("dotenv").config();
const mongoDB = require(`mongodb`);
const MongoClient = mongoDB.MongoClient;
const ObjectId = mongoDB.ObjectId;

const PUBLIC_URL = process.env.PUBLIC_URL;
console.log(PUBLIC_URL);

//products

function getAll(req, res) {
  MongoClient.connect(PUBLIC_URL, (err, db) => {
    if (err) throw err;
    const ikeaDB = db.db(`ikeaDB`);
    ikeaDB
      .collection(`products`)
      .find({})
      .toArray((err, productDB) => {
        if (err) throw console.log(err);
        res.send(productDB);
      });
  });
}

function postProduct(req, res) {
  MongoClient.connect(PUBLIC_URL, (err, db) => {
    if (err) throw err;
    const ikeaDB = db.db(`ikeaDB`);
    const newProduct = req.body;
    ikeaDB
      .collection(`products`)
      .insertOne(newProduct, (err, resNewProduct) => {
        if (err) throw console.log(err);
        console.log(resNewProduct);
        res.send(resNewProduct);
      });
  });
}

function deleteProduct(req, res) {
  MongoClient.connect(PUBLIC_URL, (err, db) => {
    if (err) throw err;
    const id = req.params.id;
    const ikeaDB = db.db(`ikeaDB`);
    ikeaDB
      .collection(`products`)
      .findOneAndDelete({ _id: ObjectId(id) }, (err, deletedDoc) => {
        if (err) throw err;
        res.send(deletedDoc);
      });
  });
}

function patchProduct(req, res) {
  MongoClient.connect(PUBLIC_URL, (err, db) => {
    if (err) throw err;
    const id = req.params.id;
    const patch = req.body;
    const ikeaDB = db.db(`ikeaDB`);
    ikeaDB
      .collection(`products`)
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: patch },
        (err, updatedDoc) => {
          if (err) throw err;
          res.send(updatedDoc);
        }
      );
  });
}

//cart

function addCart(req, res) {
  MongoClient.connect(PUBLIC_URL, (err, db) => {
    if (err) throw err;
    const ikeaDB = db.db(`ikeaDB`);
    ikeaDB
      .collection(`carts`)
      .insertOne({ products: [] }, (err, resNewCart) => {
        if (err) throw console.log(err);
        console.log(resNewCart);
        res.send(resNewCart);
      });
  });
}

function addProductToCart(req, res) {
  MongoClient.connect(PUBLIC_URL, (err, db) => {
    if (err) throw err;
    const newProduct = {
      _id: ObjectId(req.body.id),
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      img: req.body.img,
      description: req.body.description,
    };
    const ikeaDB = db.db(`ikeaDB`);
    ikeaDB
      .collection(`carts`)
      .updateOne(
        { _id: ObjectId("619044da59dc266e28e3b5ec") },
        { $push: { products: newProduct } },
        (err, addedCart) => {
          if (err) throw err;
          res.send(addedCart);
          console.log(addedCart);
        }
      );
  });
}

function getCartProducts(req, res) {
  MongoClient.connect(PUBLIC_URL, (err, db) => {
    if (err) throw err;
    const ikeaDB = db.db(`ikeaDB`);
    ikeaDB
      .collection(`carts`)
      .findOne({ _id: ObjectId("619044da59dc266e28e3b5ec") }, (err, cart) => {
        if (err) throw err;
        res.send(cart);
        console.log(cart);
      });
  });
}


function deleteCartProduct(req, res) {
  MongoClient.connect(PUBLIC_URL, (err, db) => {
    if (err) throw err;
    const productId = req.params.id;
    const ikeaDB = db.db(`ikeaDB`);
    ikeaDB
      .collection(`carts`)
      .findOneAndUpdate(
        { _id: ObjectId(`619044da59dc266e28e3b5ec`) },
        { $pull: { products: { _id: ObjectId(productId)} } },
        (err, updatedCart) => {
          if (err) throw err;
          res.send(updatedCart);
          console.log(updatedCart);
        }
      );
  });
}



//contact

function addContact(req, res) {
  MongoClient.connect(PUBLIC_URL, (err, db) => {
    if (err) throw err;
    const ikeaDB = db.db(`ikeaDB`);
    const newContact = req.body;
    ikeaDB.collection(`contacts`).insertOne(newContact, (err, resContact) => {
      if (err) throw console.log(err);
      console.log(resContact);
      res.send(resContact);
    });
  });
}

function getAllContacts(req, res) {
  MongoClient.connect(PUBLIC_URL, (err, db) => {
    if (err) throw err;
    const ikeaDB = db.db(`ikeaDB`);
    ikeaDB
      .collection(`contacts`)
      .find({})
      .toArray((err, contacts) => {
        if (err) throw console.log(err);
        res.send(contacts);
      });
  });
}

module.exports = {
  getAll,
  postProduct,
  deleteProduct,
  patchProduct,
  addProductToCart,
  getCartProducts,
  addContact,
  getAllContacts,
  deleteCartProduct,
  addCart,
};
