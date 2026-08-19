const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
  user: process.env.DB_USER || 'root',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'jamaah_haji',
  password: process.env.DB_PASSWORD || '',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

pool.getConnection()
  .then((conn) => {
    console.log('Connected to the MariaDB/MySQL database.');
    conn.release();
  })
  .catch((err) => {
    console.error('Database connection failed: ', err.message);
  });

module.exports = {
  query: async (text, params) => {
    const [rows, fields] = await pool.execute(text, params);
    return { rows, fields };
  },
  pool,
};
