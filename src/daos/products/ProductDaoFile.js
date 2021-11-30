
const FileContainer = require("../../containers/FileContainer");

class ProductDaoFile extends FileContainer {
 constructor () {
     super('/db/productos.json')
 }
};

module.exports = ProductDaoFile;