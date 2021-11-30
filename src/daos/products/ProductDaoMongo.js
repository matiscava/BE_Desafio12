const { Schema } = require('mongoose');

const MongoContainer = require("../../containers/MongoContainer");

class ProductDaoMongo extends MongoContainer {
  constructor() {
    super('products', new Schema({
      title: { type: String, required: true },
      price: { type: Number, required: true },
      thumbnail: { type: String, required: true }
    }))
  }
};

module.exports = ProductDaoMongo;