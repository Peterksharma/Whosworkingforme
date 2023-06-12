
const connectionSettings = {
    port: process.env.SQLPORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
}

module.export = connectionSettings