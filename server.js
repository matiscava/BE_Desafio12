const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const ProductoFS = require('./classes/Producto');
const { connectSqlite } = require('./options/sqlite3');
const ChatSqlite = require('./classes/Chat');

const knex = require('knex')(connectSqlite);

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const productos = new ProductoFS('./db/productos.json');
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
        chat.save();
        historialMensajes.push(data); 
        io.sockets.emit('messages', historialMensajes);
    })

})

const PORT = 8080;
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Server funcionando en el puerto ${PORT}`);
})

connectedServer.on('error', error => console.log(`Error en el servidor ${error}`))
