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
        // .finally(() => knex.destroy())
        return listado;
    }
    async save (data) {
        await knex(this.table).insert(data)
                .then(() => console.log('Data Inserted'))
                .catch((error) => {console.error(error);throw error;})
                // .finally(() => knex.destroy())
    }
    async deleteById (id){
        await knex(this.table).where('id',id).del()
                .then(() => console.log('Data delted'))
                .catch((error) => {console.error(error);throw error;})
    }
}