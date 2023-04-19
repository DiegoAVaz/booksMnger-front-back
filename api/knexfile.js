module.exports = {
    client: "mysql2",
    connection: {
        port: 3312,
        host: "localhost",
        database: "booksdb",
        user: "root",
        password: ""
    },
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        tableName: "knex_migrations"
    }
}