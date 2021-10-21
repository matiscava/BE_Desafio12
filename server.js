const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const ObjetoFS = require('./Objeto');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const productos = new ObjetoFS('./db/productos.json');
const chat = new ObjetoFS('./db/chat.json')

app.use(express.static('./public'));

app.get('/', ( req , res ) => {
    res.sendFile('index.html', {roo: __dirname})
});

io.on('connection', async (socket)=>{
    console.log('Se ha conectado un nuevo Usuario');
    
    const productsList = await productos.getAll();
    socket.emit('products', productsList);

    socket.on('new-product', (data) => {
       productos.save(data);
       productsList.push(data);
    }).emit('products', productsList);

    const historialMensajes = await chat.getAll(); 
    socket.emit('messages', historialMensajes);

    socket.on('new-message', (data) => {
        chat.save(data);
        historialMensajes.push(data); 
        
    }).emit('messages', historialMensajes);

})

const PORT = 8080;
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Server funcionando en el puerto ${PORT}`);
})

connectedServer.on('error', error => console.log(`Error en el servidor ${error}`))
