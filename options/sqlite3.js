const connectSqlite = {
    client: 'sqlite3',
    connection: {
        filename: './db/chat.sqlite'
    },
    useNullAsDefault: true
};

module.exports = {
    connectSqlite
}