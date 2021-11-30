const FirestoreContainer = require("../../containers/FirestoreContainer");

class ChatDaoFirestore extends FirestoreContainer {
    constructor() {
        super('chats')
    }
}

module.exports = ChatDaoFirestore;