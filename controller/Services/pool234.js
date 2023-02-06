const mysql = require('mysql');
const conexao = require('./bd')


const pool234 = mysql.createPool(conexao.conexao234);

//pool.on('release', () => console.log('pool => conexão retornada')); 

process.on('SIGINT', () => 
    pool234.end(err => {
        if(err) return console.log(err);
        console.log('pool => fechado');
        process.exit(0);
    })
); 

module.exports = pool234;
