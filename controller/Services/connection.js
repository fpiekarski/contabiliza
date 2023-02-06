const mysql = require('mysql');
const bd = require('./bd')

const connection = mysql.createConnection(bd.conexao2);
connection.on('release', () => console.log('connection => conexão retornada')); 

module.exports = connection;