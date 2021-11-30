const fs = require('fs');
const { normalizeMessages } = require('./../../options/normalizador');
const util = require('util');


module.exports = class FileContainer {

    constructor ( archivo ) {
        this.archivo = archivo;
    }
    async getProducts(){ 
        const data = await fs.promises.readFile(`./${this.archivo}` );
        const producto = JSON.parse(data);
        return producto;
    }
    async getAll(){ 
        try{
            const data = await fs.promises.readFile(`./${this.archivo}` );
            const  messages = JSON.parse(data);

            console.log(util.inspect(messages, false, 12 ,true));
            const messageNormalize = normalizeMessages({id: 'messages', messages});
            console.log(util.inspect(messageNormalize, false, 12 ,true));

            return normalizeMessages({id: 'messages', messages});

        } catch (error) {
            console.error('Error: ', error);
            throw error;
        }
    }
    async getById (idNum) {
        try{
            const objeto = await this.getAll()
            const objetoFiltrado = objeto.filter(obj => obj.id === parseInt(idNum));
            if (objetoFiltrado[0]===undefined) {
                return null;
            }else{
            return objetoFiltrado[0];
            }        
        } catch (error) {
            console.error('Error: ', error);
            throw error;
        }
    }
    async saveProduct(productoNuevo){
        const producto = await this.getProducts();
        let nextID = 1
        let agregarData;
        if(producto.length===0){
            agregarData= {...productoNuevo, id: nextID}
        }else{
            for (let i=0;i<producto.length ;i++) {
                while( producto[i].id >= nextID ){
                    nextID++;
                }
            }
            agregarData= {...productoNuevo, id: nextID}
        }
        producto.push(agregarData);
        const dataToJSON = JSON.stringify(producto,null,2);
        fs.writeFileSync(`./${this.archivo}` , dataToJSON);
    }
    async save(objetoNuevo){
        try{
          const data = await fs.promises.readFile(`./${this.archivo}` );
          const  messages = JSON.parse(data);;
          let nextID = 1
          let agregarData;
        
            if(Object.keys(messages).length===0){
                agregarData= {...objetoNuevo, id: nextID}
            }else{
              nextID= Object.keys(messages).length;
                agregarData= {...objetoNuevo, id: nextID}
            }
            
            const nuevaData=Object.assign(messages,{[nextID]:agregarData});
            // const nuevaData={...messages,...agregarData};
            const dataToJSON = JSON.stringify(nuevaData,null,2);
            fs.writeFileSync(`./${this.archivo}` , dataToJSON);
            return agregarData;
        } catch (error) {
            console.error('Error: ', error);
            throw error;
        }
    }
    async deleteById(idNum){
        try{
            const objeto = await this.getAll();
            const objetoFiltrado = objeto.filter(obj => obj.id !== parseInt(idNum));
            const dataToJSON = JSON.stringify(objetoFiltrado,null,2);
            fs.writeFileSync(`./${this.archivo}` , dataToJSON);
        } catch (error) {
            console.error('Error: ', error);
            throw error;
        }
    }
    async update(id,elemento){
        try{
            const data = await fs.promises.readFile(`./${this.archivo}` );
            const lista = JSON.parse(data);
            const elementoGuardado = lista.find((obj)=> obj.id === parseInt(id))
            const elementoIndex = lista.findIndex((obj)=> obj.id === parseInt(id))
            if (!elementoGuardado){
                console.error(`El elemento con el id: ${id}, no existe`);
                return null;
            }
            const elementoSubido= {
                ...elementoGuardado,
                ...elemento
            }
            lista.splice(elementoIndex,1,elementoSubido)
            const dataToJSON = await JSON.stringify(lista,null,2);
            fs.writeFileSync(`./${this.archivo}` , dataToJSON);

            return elementoSubido;
        } catch (error) {
            console.error('Error: ', error);
            throw error;
        }
    }    
}

