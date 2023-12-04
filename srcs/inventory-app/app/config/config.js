let em = {
  PORT: process.env.INVENTORY_APP_PORT || 8080,
  DATABASE_USER: process.env.INVENTORY_DB_USER || "user",
  DATABASE_PASSWORD: process.env.INVENTORY_DB_PASSWORD || "secret",
  DATABASE_NAME: process.env.INVENTORY_DB_NAME || "db_name",
  DATABASE_HOST: process.env.INVENTORY_DB_HOST || "localhost",
  DATABASE_PORT: process.env.DATABASE_PORT || 5432,
}

module.exports = Object.freeze(em)
