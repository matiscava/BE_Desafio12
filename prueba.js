const ChatSqlite = require('./classes/Chat');
const express = require('express');

const app = express();


const chat = new ChatSqlite('chats');

// async const listadoChat = await chat.getAll();

// console.log('Prueba 2', listadoChat);
app.get('/', async (req, res) => {
    const listadoChat = await chat.getAll();
    res.send(listadoChat)
})
app.post('/', async (req, res) => {
    console.log(req.body);
    // chat.save();
    const listadoChat = await chat.getAll();

    res.send(listadoChat)

})
const PORT = 8080;

app.listen( PORT, () => {
    console.log(`Server contectado en el puerto ${PORT}`);
})
