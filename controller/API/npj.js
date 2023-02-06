const axios = require('axios');
const https = require('https')


module.exports ={


    async npjVinculo(req,res){
        var endereco = "https://gs4935.intranet.bb.com.br/api/getVinculo"
        var header = req.headers
        var objetoHeader = {};
        objetoHeader.cookie = header.cookie
        const {numUnico} = req.body
        
        let Getobjeto = {
            method: 'POST',
            url: endereco,
            headers: objetoHeader,
            data: {numUnico},
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
            })

        // res.setHeader('Access-Control-Allow-Origin', '*',)
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
        res.setHeader('Access-Control-Allow-Credentials', 'true')
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
        res.setHeader('Content-Type', 'text/plain;charset=ISO-8859-1')
        res.setHeader('Transfer-Encoding', 'chunked')
        res.send(e)
    }

}