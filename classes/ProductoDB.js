const { connectMySQL } = require('./../options/mysql');
const knex = require('knex')(connectMySQL);

module.exports = class ProductoDB {
    constructor ( table ) {
        this.table = table;
    }
    async getAll(){
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
    async getById (dataId) {
        const item = [];
        await knex.from(this.table).select('id').where(dataId)
                    .then((rows) => {
                        rows.forEach((row) => {
                            item.push(row);
                        })
                    })
                    .catch((error) => {console.error(error);throw error;})
    }
    async save(data) {
        await knex(this.table).insert(data)
        .then(() => console.log('Data Inserted'))
        .catch((error) => {console.error(error);throw error;})
        // .finally(() => knex.destroy())
    }
    // async update (dataId, data) {

    // }
    async deleteById (dataId) {
        await knex(this.table).where('id',dataId).del()
        .then(() => console.log('Data delted'))
        .catch((error) => {console.error(error);throw error;})
    }
    async deleteAll () {
        await knex(this.table).del()
        .then(() => console.log('Data delted'))
        .catch((error) => {console.error(error);throw error;})
    }
}
