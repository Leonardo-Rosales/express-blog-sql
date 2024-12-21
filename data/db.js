const mysql = require('mysql2')

const connection = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: 'P0q1p0Q1_',
    database: 'db_blog'
})

connection.connect((err) => {

    if (err) throw err
    console.log('connessione riuscita');

})

module.exports = connection