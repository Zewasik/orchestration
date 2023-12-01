const { Pool } = require("pg")

const pool = new Pool({
    user: "billing",
    host: "localhost",
    database: "orders",
    password: "billing",
    port: 5432,
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