const { Schema } = require('mongoose');

const MongoContainer = require("../../containers/MongoContainer");

class ChatDaoMongo extends MongoContainer {
  constructor() {
    super('chats', new Schema({
        author: {type: Array, required:true},
        text: {type: String, required: true}
    }))
  }
};

module.exports = ChatDaoMongo;