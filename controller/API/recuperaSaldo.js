const axios = require('axios');
const https = require('https')

module.exports = {

    async recuperaSaldo(req, res, next) {
        var endereco = "https://gs4935.intranet.bb.com.br/api/saldoCC"
        var endereco1 = "https://gs4935.intranet.bb.com.br/api/dadosCC"
        const conta = parseInt(req.body.conta)
        const agencia = parseInt(req.body.agencia)
        const mci = 11
        const cookies = req.headers.cookie
        const header = {}
        const param = { agencia,conta, mci }
        header['Content-Type']= 'application/json;charset=utf-8'
        header.cookie = cookies
        var e = await axios({
            method: 'POST',
            url: endereco,
            data: { agencia,conta, mci },
            headers: header,
            strictSSL: false,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            }),validateStatus: function (status) {
                return  status <= 500; // default
            },
        }).catch((erro) => {
            console.log(erro)
        })
        res.setHeader('Content-Type', 'application/json;charset=utf-8')
        // res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
        // res.setHeader('Access-Control-Allow-Credentials', 'true')
        var a =  await axios({
            method: 'POST',
            url: endereco1,
            data: { agencia,conta },
            headers: header,
            strictSSL: false,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            }),validateStatus: function (status) {
                return  status <= 500; // default
            },
        }).then(u=>{
            try{
                if(u.status == 200){

                    const titulo = u.data.retorno.find(o=> o.chave=="TítuloRazãoAtual:")
                    e.data.tituloRazao = titulo.valor;
                }
                res.status(200).send(e.data)
            }catch(o){
                res.status(200).send(o)
                console.log("erro consulta saldo",o)
            }
        }).catch((erro) => {
            console.log(erro)
            res.status(200).send(erro)
        })
    }
}