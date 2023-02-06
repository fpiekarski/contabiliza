const pool = require('../Services/pool')
const fs = require('fs')
const encrypt = require('../Services/encrypt')
var stream = require('stream');
var base64 = require('base-64');
var utf8 = require('utf8');
var buffer = require('buffer');
var path = require('path');
const { consultaOperacoesDemanda } = require('../API/Demandas');

module.exports = {

    async salvaObs(req,res){
       const {tx,id} = req.body;
    //    const texto = file
    
    const funci = req.session.chave
        if(!funci){
            res.status(401).send("Funcionário não Identificado")
            return false
        }
        
       pool.query('insert into ConectaContabilizar.obs_contabiliza (protocolo,tx_obs,funci,data,ativo) values(?,?,?,now(),true)',[id,tx,funci],(err, resposne)=>{
           if(err){
            console.log("erro")
            res.status('500').send('error')
           }else{
            res.status('200').send("Observação salva com sucesso")
           }
    })
    },
    async getObs(req,res){
        const id = req.body.id
        pool.query('select * from  ConectaContabilizar.obs_contabiliza  where protocolo = ? and ativo = 1',[id],(err, response)=>{
            if(err){
                console.log("erro")
                res.status('500').send('error')

            }else{
                res.status('200').send(response)
            }
        })
    },
    async excluiObs(req,res){
        const id = req.body.id
        pool.query('update  ConectaContabilizar.obs_contabiliza set ativo = 0 where id = ?',[id],(err, response)=>{
            if(err){
                console.log("erro")
                res.status('500').send('error')

            }else{
                res.status('200').send(response)
            }
        })
    },
}


