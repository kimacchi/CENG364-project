exports.up = async function (sql) {
  await sql`
  CREATE TABLE IF NOT EXISTS users(
    id CHARACTER VARYING(255) PRIMARY KEY NOT NULL,
    username CHARACTER VARYING(255) NOT NULL,
    password CHARACTER VARYING(255) NOT NULL,
    watchlist VARCHAR(255)[] NOT NULL DEFAULT '{}'::VARCHAR(255)[]),
  )
  `
}

exports.down = async function (sql) {
  await sql`
    DROP TABLE IF EXISTS users
  `
}
