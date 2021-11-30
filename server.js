const express = require('express');
const faker = require('faker');
require('dotenv').config();
const { Server: HttpServer } = require('http');
const { Server: IOServer, Socket } = require('socket.io');

const { productDao , chatDao } = require('./src/daos');

const productos = new productDao;
const chat = new chatDao;

 
let bodyParser = require('body-parser');


const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);


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
    
    const productsList = await productos.getProducts();
    socket.emit('products', productsList);

    socket.on('new-product', (data) => {
        productos.saveProduct(data);
        productsList.push(data);
        io.sockets.emit('products', productsList);
    })
    const historialMensajes = await chat.getAll();

    socket.emit('messages', historialMensajes);

    socket.on('new-message', async (data) => {
        const nuevaData = await chat.save(data);
        const nuevoHistorial = await chat.getAll();
        // Object.keys(historialMensajes).push(nuevaData)
        io.sockets.emit('messages', nuevoHistorial);
    })
    console.log("url: " + socket.handshake.url);
})


app.get('/api/productos-test', async ( req , res ) => {
    const productsList = await productos.getRandom();
    // socket.emit('products', productsList);
    // res.send(productsList)
    res.sendFile('index.html', {roo: __dirname})

});
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
