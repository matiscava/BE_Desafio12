const { connectSqlite } = require('./../options/sqlite3');
const knex = require('knex')(connectSqlite);

module.exports = class ChatSqlite {
    
    constructor ( table ) {
        this.table = table;
    }
    async getAll() {
        const listado = [];
        await knex.from(this.table).select('*')
        .then((rows) => {
            rows.forEach( (row) => {
                listado.push(row)
            });
        })
        .catch((error) => {console.error(error);throw error;})
        .finally(() => knex.destroy())
        // console.log('Listado',listado);
        return listado;
    }
    async save() {
        const data = {message: 'Segunda prueba del Desafio',
        user: 'matiscava@hotmail.com',
        date: '20/09/2021 15:04:54'}
        console.log('Prueba',data);
        await knex(this.table).insert(data)
                .then(() => console.log('Data Inserted'))
                .catch((error) => {console.error(error);throw error;})
                .finally(() => knex.destroy())
    }
}