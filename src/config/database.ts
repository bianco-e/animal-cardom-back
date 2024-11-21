import dotenv from 'dotenv'
dotenv.config()

const DB_HOST = process.env.ANIMAL_CARDOM_DB_HOST
const DB_USER = process.env.ANIMAL_CARDOM_DB_USER
const DB_PASSWORD = process.env.ANIMAL_CARDOM_DB_PASSWORD
const DB_NAME = process.env.ANIMAL_CARDOM_DB_NAME

export { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER }
