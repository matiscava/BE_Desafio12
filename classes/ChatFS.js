const fs = require('fs');
const { normalizeMessages } = require('./normalizador');

module.exports = class ObjetoFS {
    constructor ( archivo ) {
        this.archivo = archivo;
    }
    async getAll(){ 
        try{
            const data = await fs.promises.readFile(`./${this.archivo}` );
            const  messages = JSON.parse(data);
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
    async newCarrito(){
        try{
            const data = await fs.promises.readFile(`./${this.archivo}` );
            const objeto = JSON.parse(data);
            let nextID = 1;
            let carritoNuevo;
            const fecha = new Date().toLocaleString();
            if(objeto.length===0){
                carritoNuevo={id: nextID, timestamp: fecha, products:[] }
            }else{
                for (let i=0;i<objeto.length ;i++) {
                    while( objeto[i].id >= nextID ){
                        nextID++;
                    }
                }
                carritoNuevo={id: nextID, timestamp: fecha, products:[]}
            }
            objeto.push(carritoNuevo);
            const dataToJSON = JSON.stringify(objeto,null,2);
            fs.writeFileSync(`./${this.archivo}` , dataToJSON);
            return nextID;
        } catch (error) {
            console.error('Error: ', error);
            throw error;
        }
    }
    async agregarProductos(carritoId,producto){
        try {
        const data = await fs.promises.readFile(`./${this.archivo}` );
        const carrito = JSON.parse(data);
        const carritoElegido = carrito.find( (carro) => carro.id === parseInt(carritoId) );
        const fecha = new Date().toLocaleString();
       
        carritoElegido.timestamp = fecha;
        const carritoElegidoIndex = carrito.findIndex((carro) => carro.id === parseInt(carritoId));
        carritoElegido.products.push(...producto);
        carrito.splice(carritoElegidoIndex,1,carritoElegido);
        const dataToJSON = JSON.stringify(carrito,null,2);
        fs.writeFileSync(`./${this.archivo}` , dataToJSON);
    } catch (error) {
        console.error('Error: ', error);
        throw error;
    }
    }

    async agregarXId(carritoId,arrayProductos){
        try{
            const data = await fs.promises.readFile(`./${this.archivo}` );
            const carrito = JSON.parse(data);
            const carritoElegido = carrito.find( (carro) => carro.id === carritoId );
            const carritoElegidoIndex = carrito.findIndex((carro) => carro.id === parseInt(carritoId));
            const fecha = new Date().toLocaleString();
        
            carritoElegido.timestamp = fecha;
            arrayProductos.forEach((produ) => {
            
                const productoRepetido = carritoElegido.products.find( (producto) => producto.id === produ.id);
                if(productoRepetido===undefined){
                    carritoElegido.products.push(produ);
                }else{
                    productoRepetido.timestamp=fecha
                    productoRepetido.quantity+=produ.quantity;
                }


            });
    
            carrito.splice(carritoElegidoIndex,1,carritoElegido);
            const dataToJSON = JSON.stringify(carrito,null,2);
            fs.writeFileSync(`./${this.archivo}` , dataToJSON);
        } catch (error) {
            console.error('Error: ', error);
            throw error;
        }
    }
    async getCarrito(carritoId){
        try{
            const data = await fs.promises.readFile(`./${this.archivo}` );
            const carrito = JSON.parse(data);
            const carritoElegido = carrito.find( (carro) => carro.id === parseInt(carritoId) );

            return carritoElegido;
        } catch (error) {
            console.error('Error: ', error);
            throw error;
        }
    }

    async vaciarCarrito(carritoId){
        try{
            const data = await fs.promises.readFile(`./${this.archivo}` );
            const carrito = JSON.parse(data);
            const carritoFiltrado = carrito.filter( (carro) => carro.id !== parseInt(carritoId));
            const dataToJSON = JSON.stringify(carritoFiltrado,null,2);
            fs.writeFileSync(`./${this.archivo}` , dataToJSON);
        } catch (error) {
            console.error('Error: ', error);
            throw error;
        }
    }
    async borrarItem(carritoId, productoId){
        try{
            const data = await fs.promises.readFile(`./${this.archivo}` );
            const carrito = JSON.parse(data);
            const carritoElegido = carrito.find( (carro) => carro.id === parseInt(carritoId) );
            const fecha = new Date().toLocaleString();
        
            carritoElegido.timestamp = fecha;
            const carritoElegidoIndex = carrito.findIndex((carro) => carro.id === parseInt(carritoId));
            const productosCarrito = carritoElegido.products;
            const producto = productosCarrito.find((carro) => carro.id === parseInt(productoId))
            if(producto!==undefined){
                const carritoFiltrado = productosCarrito.filter( (carro) => carro.id !== parseInt(productoId));
                carritoElegido.products.splice(0,productosCarrito.length)
                carritoElegido.products.push(...carritoFiltrado);    
                carrito.splice(carritoElegidoIndex,1,carritoElegido);
                const dataToJSON = JSON.stringify(carrito,null,2);
                fs.writeFileSync(`./${this.archivo}` , dataToJSON);
                return true;
            }else{
                return false;
            }
        } catch (error) {
            console.error('Error: ', error);
            throw error;
        }
    }
}