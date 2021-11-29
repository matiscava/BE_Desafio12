const express = require('express');
const faker = require('faker');
const { Server: HttpServer } = require('http');
const { Server: IOServer, Socket } = require('socket.io');
const ProductoDB = require('./classes/ProductoDB');
const ChatSqlite = require('./classes/Chat');
var bodyParser = require('body-parser');


const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const productos = new ProductoDB('products');
const chat = new ChatSqlite('chats')

app.use(bodyParser.json()); // body en formato json
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('./public'));

app.get('/', ( req , res ) => {
    res.sendFile('index.html', {roo: __dirname})
});
app.get( '/api/productos-test', ( req , res ) => {
    const productsList = [...new Array(5)].map((_, index) => ({
        id:index+1,
        title: faker.commerce.product(),
        price: faker.commerce.price(),
        thumbnail: faker.image.imageUrl()
    }))
    res.json(productsList);
})

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

})

app.delete( '/' , async (req ,res) => {
    await chat.deleteAll();
    res.send('chat deleted')
})

app.post( '/' , async (req ,res) => {
    const mensaje = req.body;
    await chat.save(mensaje);
    res.send('chat uploaded')
})

const PORT = process.env.PORT || 8080;
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Server funcionando en el puerto ${PORT}`);
})

connectedServer.on('error', error => console.log(`Error en el servidor ${error}`))
