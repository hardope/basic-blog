import * as dotenv from 'dotenv';

dotenv.config();

const config = {
    dialect: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    autoLoadModels: true,
    synchronize: true,
    logging: false,
    JWT_SECRET: process.env.JWT_SECRET
};

console.log(typeof config.JWT_SECRET)

export default config;