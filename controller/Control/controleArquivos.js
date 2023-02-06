const pool = require('../Services/pool')
const fs = require('fs')
const encrypt = require('../Services/encrypt')
var stream = require('stream');
var base64 = require('base-64');
var utf8 = require('utf8');
var buffer = require('buffer');
var path = require('path');

module.exports = {

    async uploadFile(req,res){
       console.log(req.files)
       const file = req.files.file.data
       const name = req.files.file.name
       const funci = req.session.chave
       
       const tipo = req.files.file.mimetype
       const protocolo = req.session.protocolo
       if(!protocolo|| protocolo == ""){
        res.status(401).send("Protocolo não informado")
        return false
       }
       const tx = await Buffer.from(file).toString('base64');
          const texto = encrypt.encrypt(tx)
    //    const texto = file
        if(!funci){
            res.status(401).send("Funcionário não Identificado")
            return false
        }
       pool.query('insert into ConectaContabilizar.files (name,protocolo,file,data,funci,type) values(?,?,?,now(),?,?)',[name,protocolo,texto,funci,tipo],(err, resposne)=>{
           if(err){
              // console.log(err)
               console.log("erro")
           }else{
               res.send('200')
           }
    })
    },
    async downloadFile(req,res){
        const id = req.query.id
        try{

            pool.query('select * from  ConectaContabilizar.files where id = ?',[id],(err, response)=>{
                const img =encrypt.decrypt(response[0].file) //response[0].file // 
                var fileContents = Buffer.from(img,"base64");
                
                var readStream = new stream.PassThrough();
                readStream.end(fileContents);
                res.setHeader('Content-Disposition', 'attachment; filename=' + response[0].name);
                res.setHeader('name-file', response[0].name);
                res.setHeader('Content-Type', response[0].type);
                res.setHeader('Access-Control-Expose-Headers', 'name-file');
                
                
                readStream.pipe(res);
            })
        }catch(r){
            res.status(500).send('error')
        }
        
    },
    async findFiles(req,res){
      
            protocolo = req.query.sumula
      
        pool.query('select id,name,type,funci,data from ConectaContabilizar.files where protocolo = ?',[protocolo],(rerr, response)=>{
            res.send(response)
        })
    }
}


