const { connectMySQL } = require('./options/mysql.js');
const knex = require('knex')(connectMySQL);

const productos = [
    {
        "title": "Caramelo media hora",
        "price": 5,
        "thumbnail": "https://vinomanos.com/wp-content/uploads/2020/08/bazaart7-4-600x600-1.png",
        
      },
      {
        "title": "Pico Dulce",
        "price": 20,
        "thumbnail": "https://molti.com.ar/wp-content/uploads/2020/09/Diapositiva2-5.jpg",
        
      },
      {
        "title": "Chocolate Jack",
        "price": 45,
        "thumbnail": "http://d3ugyf2ht6aenh.cloudfront.net/stores/135/794/products/d_nq_np_665301-mla25956161225_092017-o1-f7e3f3d35fbf9f9e9016001697986976-640-0.jpg",
        
      },
      {
        "title": "Naranju",
        "price": 50,
        "thumbnail": "https://cotillongonic.com.ar/wp-content/uploads/2020/10/NARANJUGONIC.jpg",
        
      },
      {
        "title": "Tubby 4",
        "price": 150,
        "thumbnail": "https://pbs.twimg.com/media/DhTqqNtXkAU_jbn.jpg",
        
      },
      {
        "title": "Chupelatin",
        "price": 500,
        "thumbnail": "https://http2.mlstatic.com/D_NQ_NP_697980-MLA42179185856_062020-O.jpg",
        
      },
      {
        "title": "Push Pop",
        "price": 540,
        "thumbnail": "https://superonline.ar/wp-content/uploads/2020/09/25007-1.jpg",
        
      },
      {
        "title": "Crazy dips",
        "price": 420,
        "thumbnail": "https://m.media-amazon.com/images/I/51ILmlzL-zL.jpg",
        
      },
      {
        "title": "ALfajor Fulbito",
        "price": 41,
        "thumbnail": "https://walmartar.vteximg.com.br/arquivos/ids/867784-292-292/Alfajor-Fulbito-Man-X-30-Gr-1-472640.jpg?v=637292532566030000",
        
      }
]

knex('products').insert(productos)
    .then(() => console.log('Productos cargados'))
    .catch((error) => {console.error(error);throw error;})
    .finally(() => knex.destroy())