const renderYest = (productos) => {
    let table = document.getElementById("tablaTest");
    index = productos.length
    productos.forEach((el, )=>{
    table.innerHTML += "<tr><td>"+ el +"</td></tr>";
});
}