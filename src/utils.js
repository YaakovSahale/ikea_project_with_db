const mongoDB = require(`mongodb`);
const MongoClient = mongoDB.MongoClient;
const ObjectId = mongoDB.ObjectId;
const mongoURL = "mongodb://localhost:27017/";

function getAll(req, res) {
  MongoClient.connect(mongoURL, (err, db) => {
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
  MongoClient.connect(mongoURL, (err, db) => {
    if (err) throw err;
    const ikeaDB = db.db(`ikeaDB`);
    const newProduct = req.body
    ikeaDB.collection(`products`).insertOne(newProduct, (err, resNewProduct) => {
      if (err) throw console.log(err);
      console.log(resNewProduct);
      res.send(resNewProduct);
    });
  });
}

function deleteProduct(req, res) {
  MongoClient.connect(mongoURL, (err, db) => {
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
  MongoClient.connect(mongoURL, (err, db) => {
    if (err) throw err;
    const id = req.params.id;
    
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

module.exports = { getAll, postProduct, deleteProduct, patchProduct };
