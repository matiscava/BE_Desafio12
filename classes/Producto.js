const fs = require('fs');
module.exports = class ProductoFS {

    constructor ( archivo ) {
        this.archivo = archivo;
    }
    async getAll(){ 
        const data = await fs.promises.readFile(`./${this.archivo}` );
        const producto = JSON.parse(data);
        return producto;
    }
    async getById (idNum) {
        const producto = await this.getAll()
        const productoFiltrado = producto.filter(obj => obj.id === idNum);
        if (productoFiltrado[0]===undefined) {
        //  return {error: 'producto no encontrado'}
        return
        }else{
         return productoFiltrado[0];
        }        
    }
    async save(productoNuevo){
        const producto = await this.getAll();
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
    async deleteById(idNum){
        const producto = await this.getAll();

        const productoFiltrado = producto.filter(obj => obj.id !== idNum);
        const dataToJSON = JSON.stringify(productoFiltrado,null,2);
        fs.writeFileSync(`./${this.archivo}` , dataToJSON);
    }
    async update(id,elemento){
        const data = await fs.promises.readFile(`./${this.archivo}` );
        const lista = JSON.parse(data);
        const elementoGuardado = lista.find((obj)=> obj.id === id)
        const elementoIndex = lista.findIndex((obj)=> obj.id === id)
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
    }
}


