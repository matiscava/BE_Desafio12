const FirestoreContainer = require("../../containers/FirestoreContainer");

class ProductDaoFirestore extends FirestoreContainer {
    constructor() {
        super('products')
    }
}

module.exports = ProductDaoFirestore;