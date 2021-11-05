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

const renderMensajes = (mensajes) => {
    mensajes.reverse();
    const html = mensajes.map((mensaje) => {
        return(`
            <div class='mensaje' id='mensaje-${mensaje.id}'>
                <p class='mensajetext mensajetext--user'>${mensaje.user} </p>
                <p class='mensajetext mensajetext--date'>[${mensaje.date}]: </p>
                <p class='mensajetext mensajetext--message'>${mensaje.message} </p>
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
    }
    socket.emit('new-product', producto);
    document.getElementById('title').value = '';
    document.getElementById('price').value = '';
    document.getElementById('thumbnail').value = '';
    
    return false;
}

// const seleccionarProducto = (id) => {
//     socket.emit('productSelected',id);
// }

const cargarMensaje = (e)=> {
    e.preventDefault();
   
    const fecha = new Date().toLocaleString();
    const mensaje = {
        user: document.getElementById('email').value,
        message: document.getElementById('mensaje').value,
        date: fecha 
    }
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

socket.on('messages', (data) => {
    renderMensajes(data)
})