const connectSqlite = {
    client: 'sqlite3',
    connection: {
        filename: './db/ecommerce.sqlite'
    },
    useNullAsDefault: true
};

module.exports = {
    connectSqlite
}