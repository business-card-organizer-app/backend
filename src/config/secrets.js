const dotenv = require('dotenv');

dotenv.config()
module.exports = {
    jwtSecret: process.env.JWT_SECRET,
    dbUsername: process.env.DB_USERNAME,
    dbPassword: process.env.DB_PASSWORD,
    nodeEnvironment: process.env.NODE_ENV,
    herokuDb: process.env.DATABASE_URL
}