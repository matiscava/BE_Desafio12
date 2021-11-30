const mongoose = require('mongoose');
const options = require('./../../options/options');
const { normalizeMessages } = require('./../../options/normalizador');


class MongoContainer {
  constructor(collection, schema) {
    this.collection = mongoose.model(collection, schema);
    this.init();
  }
  
  async init() {
    if (!this.conexion) {
      this.conexion = await mongoose.connect(options.mongodb.host, options.mongodb.options);
    }
  }

  async getProducts(){ 
    try {
        const documents = await this.collection.find({},{__v:0})
        return documents;
      } catch (error) {
        console.error('Error:', error);
      }
}
  
  async getAll() {
    try {
      const messages = await this.collection.find({},{__v:0})
      console.log('mensajes',normalizeMessages({id: 'messages', messages}));
      return normalizeMessages({id: 'messages', messages});
    } catch (error) {
      console.error('Error:', error);
    }
  }
  async saveProduct(producto) {
    try {    
        let agregarData={...producto};
        const document = await new this.collection(agregarData);
        const response = await document.save()
        console.log('create new product: ', {response});
        return document._id; 
    } catch (error) {
      console.error(error); throw error;
    }
  }
  async save(objetoNuevo) {
    try {
        const messages = await this.getAll();
        let nextID = 1;
        if(Object.keys(messages).length!==0){
            nextID = Object.keys(messages).length;
        }
        
        // const nuevaData=Object.assign(messages,{[nextID]:agregarData});
        let agregarData = {[nextID]: objetoNuevo}
        console.log(agregarData);

      const document = await new this.collection(objetoNuevo);
      const response = await document.save()

      console.log('create new product: ', {response});
      return document._id; 
    } catch (error) {
      console.error(error); throw error;
    }
  }
  async getById(id) {
    try {
      const documents = await this.collection.find({ _id: id },{__v:0})
      if (documents.length === 0) {
        return null;
      } else {
        return documents[0];
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  async deleteById(id) {
    try {
      const response = await this.collection.deleteOne({ _id: id });
      console.log('deleteById: ', {response});
    }catch (error) {
      console.error('Error:', error);
    };
  }

  async deleteAll() {
    try {
      await this.collection.deleteMany({});
      console.log('deleteAll: ');
    } catch (error) {
      console.error('Error:', error);
    };
  }
  async update(id, element) {
    const fecha = new Date().toLocaleString();

    const { n, nModified } = await this.collection.updateOne({ _id: id }, {
      $set: {element,timestamp:fecha}
    })
    if (n == 0 || nModified == 0) {
      console.error(`Elemento con el id: '${id}' no fue encontrado`);
      return null;
    }

    const elementUpdated = await this.getById(id);

    return elementUpdated;
  }
  
  async newCarrito(){
    try{
        const fecha = new Date().toLocaleString();
        let carritoNuevo={timestamp: fecha, products:[] };
        const document = await new this.collection(carritoNuevo);
        const response = await document.save()
        console.log('create new cart: ', {response});
        return document._id; 
    } catch (error) {
        console.error('Error: ', error);
        throw error;
    }
  }
  async agregarProductos(carritoId,productos){
    try {
      const fecha = new Date().toLocaleString();
      const documents = await this.collection.updateOne({ _id: carritoId },{
        $set: {products:productos},$set:{timestamp: fecha}
      })
    
    } catch (error) {
      console.error('Error: ', error);
      throw error;
    }
  }

  async getCarrito(carritoId){
    try{
      const documents = await this.collection.find({ _id: carritoId },{__v:0})
        return documents;
    } catch (error) {
        console.error('Error: ', error);
        throw error;
    }
  }
  async vaciarCarrito(carritoId){
    try{
      const fecha = new Date().toLocaleString();

      this.collection.updateOne({ _id: carritoId },{$set: {products:[]}});
      this.collection.updateOne({ _id: carritoId },{$set: {timestamp:fecha}});
    
    } catch (error) {
        console.error('Error: ', error);
        throw error;
    }
  }
  async borrarItem(carritoId, productoId){
    try{
      this.collection.findOneAndDelete({ _id: carritoId },{products:[{_id:productoId}]});
      this.collection.updateOne({ _id: carritoId },{$set: {timestamp:fecha}});
      return true
    } catch (error) {
        console.error('Error: ', error);
        throw error;
    }
}
}

module.exports = MongoContainer;