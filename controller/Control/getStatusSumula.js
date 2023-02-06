const mysql = require('mysql');
const pool = require('../Services/pool');
const bd = require('../Services/bd');
const getStatusCheck = require('../CheckList/getStatusCheck')
module.exports = {
    consultaFuncionario(req,res){
        return new Promise((resolve,reject)=>{
            res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
            res.setHeader('Access-Control-Allow-Credentials', 'true')
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
            res.setHeader('Content-Type', 'text/plain;charset=ISO-8859-1')
            res.setHeader('Transfer-Encoding', 'chunked')
            
            pool.query('select * from Sumula.tb_fase_sumula where ano_sumula =? and prf_sumula = ? and id_sumula = ?',[req.body.funcionario],(err,response)=>{
                if(err){
                        console.log(err)
                    res.status(500).send('houve um erro ao recuperar os dados, por favor tente novamente')
                    resolve()
                }else{
                    res.status(200).send(response[0])
                    resolve()
                }
            })

        })
    }

}