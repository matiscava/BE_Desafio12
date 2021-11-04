const connectMySQL = {
    client: 'mysql',
    connection: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'coderhouse',
        database: 'productsdb'
    },
    pool: { min: 0, max: 7}
};

module.exports = {
    connectMySQL
}
