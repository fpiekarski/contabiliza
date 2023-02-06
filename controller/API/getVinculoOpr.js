const axios = require('axios');
const https = require('https');
const pool = require('../Services/pool')
const mysql = require('mysql')
module.exports ={


    async vinculoSas(req,res){
        var endereco = "https://gs4935.intranet.bb.com.br:3500/querySas"
        var header = req.headers
        var objetoHeader = {};
        objetoHeader.cookie = header.cookie
        const {query} = req.body
       const data= {
          
            "lib": "LIBNAME DB2OPR DB2 DATABASE=bdb2p04 SCHEMA=DB2OPR AUTHDOMAIN='*********'",
            "query": "SELECT * , put(NR_UNCO_CTR_OPR,18.) AS NR_UNCO_ORIGINAL,put(NR_UNCO_CTR_VCLD,18.) AS NR_UNCO_NOVO  FROM DB2OPR.VCL_CTR A  where " + query,
          
        }
        let Getobjeto = {
            method: 'POST',
            url: endereco,
            headers: objetoHeader,
            data: data,
            strictSSL: false,
            withCredentials: true,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        }
        const e =  await axios(Getobjeto)
            .then(async (response) => {
                console.log(response)
                return response.data;
            }).catch(error =>{
                console.log(error)
            })

        // res.setHeader('Access-Control-Allow-Origin', '*',)
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
        res.setHeader('Access-Control-Allow-Credentials', 'true')
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
        res.setHeader('Content-Type', 'text/plain;charset=ISO-8859-1')
        res.setHeader('Transfer-Encoding', 'chunked')
        res.send(e)
    },
    async vinculo(req,res){
        const {query} = req.body
        const qr = mysql.escape(query)
        const r = qr.replace(/('')/g,"")
        const l = []
        for await (i of query){
            l.push(i.numeroUnico)
        }
        const q=`SELECT MAX(STR_TO_DATE(dt_vcl_ctr, "%d%b%Y")) AS DATA, CAST(nr_unco as CHAR) AS nr_unco,CAST(vinculado AS CHAR) AS vinculado FROM ConectaContabilizar.tb_vinculo_sas WHERE nr_unco in(${l.toString()}) group by vinculado`
       
       pool.query(q,(err,resposta,t,u)=>{

           
           // res.setHeader('Access-Control-Allow-Origin', '*',)
           res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
           res.setHeader('Access-Control-Allow-Credentials', 'true')
           res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
           res.setHeader('Content-Type', 'text/plain;charset=ISO-8859-1')
           res.setHeader('Transfer-Encoding', 'chunked')
           res.send(resposta)
        })
    }
    
}
