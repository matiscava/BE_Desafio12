const ProductDaoMongo = require('./products/ProductDaoMongo');
const ProductDaoFirestore = require('./products/ProductDaoFirestore.js');
const ProductDaoFile = require('./products/ProductDaoFile');

const ChatDaoMongo = require('./chats/ChatDaoMongo');
const ChatDaoFirestore = require('./chats/ChatDaoFirestore');
const ChatDaoFile = require('./chats/ChatDaoFile');

const daos = {};
// si setamos mongo vamos a exportar los daos de mongo
if (process.env.storage === 'mongodb') {
  daos['productDao'] = ProductDaoMongo;
  daos['chatDao'] = ChatDaoMongo;
  console.log('Se conecto a mongo');

}

// si setamos firestore vamos a exportar los daos de firestore
if (process.env.storage === 'firestore') {
  daos['productDao'] = ProductDaoFirestore;
  daos['chatDao'] = ChatDaoFirestore;
  console.log('Se conecto al firestore');

}

// si setamos archivo vamos a exportar los daos de archivo
if (process.env.storage === 'file') {
  daos['productDao'] = ProductDaoFile;
  daos['chatDao'] = ChatDaoFile;
  console.log('Se conecto al file');

}

module.exports = daos;