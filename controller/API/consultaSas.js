const axios = require('axios');
const https = require('https')

module.exports = {

    async recuperaDados(req, res, next) {
        const {conta,agencia,user,pwd} = req.body
        const cookies = req.headers.cookie
        const header = {}
        console.log("sas")
        header['Content-Type']= 'application/json;charset=utf-8'
        header.cookie = cookies
        res.setHeader('Content-Type', 'application/json;charset=utf-8')
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
        res.setHeader('Access-Control-Allow-Credentials', 'true')
        //Qunado utilizado o SAS para pesquisas, é necessário o envio das credenciais
        // if(user==undefined||pwd ==undefined ){
        //     res.send({erro:"atenção, dados ausentes"})
        //     return false
        // }
        // if(user==""||pwd =="" ){
        //     res.send({erro:"atenção, dados ausentes"})
        //     return false
        // }
        // if(user==null||pwd == null){
        //     res.send({erro:"atenção, dados ausentes"})
        //     return false
        // }
        // if(!user||!pwd){
        //     res.send({erro:"atenção, dados ausentes"})
        //     return false
        // }
        var endereco = process.env.API_DB2
        const data = {"query":`SELECT  DEB307_RAZAO as razao FROM DB2DEB.TDEB307 t1  WHERE t1.DEB307_AGENCIA = ${agencia} AND t1.DEB307_CONTA =${conta};`}
        var e = await axios({
            method: 'post',
            url: endereco,
            data:data,
            headers: header,
            strictSSL: false,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        }).catch((erro) => {
            console.log(erro)
        })
   
        res.send(e.data)

    }

}