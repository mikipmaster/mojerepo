const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'YOUR_AZURE_MYSQL_HOST',
  user: 'YOUR_USERNAME',
  password: 'YOUR_PASSWORD',
  database: 'YOUR_DATABASE_NAME'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MySQL database.');
});

module.exports = connection;
