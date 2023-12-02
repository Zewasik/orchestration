const { DATABASE_USER,
    DATABASE_PASSWORD,
    DATABASE_NAME,
    DATABASE_HOST,
    DATABASE_PORT } = require('./config/config')
const { Pool } = require("pg")

const pool = new Pool({
    user: DATABASE_USER,
    host: DATABASE_HOST,
    database: DATABASE_NAME,
    password: DATABASE_PASSWORD,
    port: DATABASE_PORT,
})

function createOrder({ userId, numberOfItems, totalAmount }, acknowledge, notAcknowledge) {
    pool
        .query(
            "INSERT INTO orders(user_id, number_of_items, total_amount) VALUES($1, $2, $3)",
            [userId, numberOfItems, totalAmount]
        )
        .then(acknowledge)
        .catch((err) => {
            console.log(err)
            notAcknowledge()
        })
}

module.exports = {
    createOrder
}