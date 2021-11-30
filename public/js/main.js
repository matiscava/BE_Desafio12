const socket = io.connect();

const renderProductos = (productos) => {
    const html = productos.map((producto) => {
        return (`
            <div class='producto' id='producto-${producto.id}'>
                <img src='${producto.thumbnail}' alt='Imagen de ${producto.title}' class='productoImagen'>
                <div class='productoTextos'>
                    <div class='productoTextoCuerpo'>
                        <p class='productoTitulo'>${producto.title}</p>
                        <p class='productoDescripcion'>${producto.description}</p>
                    </div>
                    <div class='productoTextoValores'>
                        <p class='productoStock'>Stock: ${producto.stock}</p>
                        <p class='productoPrecio'>$ ${producto.price}</p>
                    </div>
                </div>
            </div>
                    `)
                }).join(' ');
    document.getElementById('productos').innerHTML= html;
}
const counterNormalize = (normalizado, sinNormalizar) => {
    const porcentaje = parseFloat((normalizado*100)/sinNormalizar).toFixed(2);
    const html = `<p class="textoPorcentual">Procentaje de compresión : ${porcentaje}%</p>`;
    document.getElementById('contadorNomalize').innerHTML = html;
}
const renderMensajes = (mensajes) => {
    mensajes.messages.reverse()

    const html = mensajes.messages.map((mensaje) => {
        return(`
            <div class='mensaje' id='mensaje-${mensaje.id}'>
                <img src="${mensaje.author.avatar}" alt="avatar usuario-${mensaje.id}" class="mensajeAvatar">
                <div class='contenedorTexto'>
                    <p class='mensajetext mensajetext--user'>${mensaje.author.id} </p>
                    <p class='mensajetext mensajetext--date'>[${mensaje.author.date}]: </p>
                    <p class='mensajetext mensajetext--message'>${mensaje.text} </p>
                </div>
            </div>
        `)
    }).join(' ');
    document.getElementById('chat').innerHTML = html;
}

const cargarProducto = (e) => {
    e.preventDefault();
    
    const producto = {
        title: document.getElementById('title').value,
        price: parseInt(document.getElementById('price').value),
        thumbnail: document.getElementById('thumbnail').value,
        description: document.getElementById('description').value,
        stock: parseInt(document.getElementById('stock').value),
    }
    socket.emit('new-product', producto);
    document.getElementById('title').value = '';
    document.getElementById('price').value = '';
    document.getElementById('thumbnail').value = '';
    document.getElementById('description').value = '';
    document.getElementById('stock').value = '';
    
    return false;
}



const cargarMensaje = (e)=> {
    e.preventDefault();
   
    const fecha = new Date().toLocaleString();
    const mensaje = {
        author: {id: document.getElementById('email').value,
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        edad: document.getElementById('edad').value,
        alias: document.getElementById('alias').value,
        avatar: document.getElementById('avatar').value,
        date: fecha },
        text: document.getElementById('mensaje').value
    };
    
    document.getElementById('mensaje').value='';
    socket.emit('new-message', mensaje);

    return false;
}

const productForm = document.getElementById('productForm');
productForm.addEventListener('submit', cargarProducto);

const chatForm = document.getElementById('chatForm');
chatForm.addEventListener('submit', cargarMensaje);

socket.on('products', (data)=>{
    renderProductos(data);
})

const schemaAuthor = new normalizr.schema.Entity('author', {}, {idAttribute: 'email'})

const schemaMessage = new normalizr.schema.Entity('message', {
    author: schemaAuthor
})

const schemaMessages = new normalizr.schema.Entity('messages', {
    messages: [schemaMessage]
})

socket.on('messages', (data) => {
    const dataDenormalized = normalizr.denormalize(data.result, schemaMessages, data.entities)
    const dataLength = JSON.stringify(data).length
    const dataDenomalizedLength = JSON.stringify(dataDenormalized).length

    counterNormalize(dataLength,dataDenomalizedLength)

    renderMensajes(dataDenormalized)
})