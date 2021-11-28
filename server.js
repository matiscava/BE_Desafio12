const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer, Socket } = require('socket.io');
const ProductoDB = require('./classes/ProductoDB');
const ChatSqlite = require('./classes/Chat');


const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const productos = new ProductoDB('products');
const chat = new ChatSqlite('chats')

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
        io.sockets.emit('products', productsList);
    })
    const historialMensajes = await chat.getAll();

    socket.emit('messages', historialMensajes);

    socket.on('new-message', (data) => {
        chat.save(data);
        historialMensajes.push(data); 
        io.sockets.emit('messages', historialMensajes);
    })
    console.log("url: " + socket.handshake.url);
})


app.get('/api/productos-test', async ( req , res ) => {
    const productsList = await productos.getRandom();
    // socket.emit('products', productsList);
    // res.send(productsList)
    res.sendFile('index.html', {roo: __dirname})

});

const PORT = process.env.PORT || 8080;
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Server funcionando en el puerto ${PORT}`);
})

connectedServer.on('error', error => console.log(`Error en el servidor ${error}`))
