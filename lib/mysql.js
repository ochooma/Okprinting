var mysql = require('mysql');
var Promise = require('bluebird');

function getPool() {
  if (this.pool) {
    return this.pool;
  }
  this.pool = mysql.createPool({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME,
  });
  return this.pool;
}

function query(query) {
  return new Promise((resolve, reject) => {
    getPool().getConnection((err, conn) => {
      if (err) {
        reject(err);
      }
      conn.query(query, (err, data) => (err ? reject(err) : resolve(data)));
      conn.release();
    });
  });
}

module.exports = query;
