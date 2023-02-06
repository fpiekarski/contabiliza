const axios = require('axios');
const https = require('https')
require('dotenv').config();


module.exports ={


    async getRateio(req,res){
        var endereco = process.env.API_DB2
        var header = req.headers
        var objetoHeader = {};
        objetoHeader.cookie = header.cookie
        const {npj} = req.body
        const query =  `select t1.NPJ, case when count(t1.NPJ)>1 then 'S' else 'N' end as RATEIO from (SELECT DISTINCT DIGITS(t2.NR_PRC_PPL) AS NPJ, t1.NR_PSS FROM DB2PAJ.PRC_ITSE_JRD t2 left JOIN DB2PAJ.PSS_CMTD_PRC t1 ON (t1.NR_PRC = t2.NR_PRC) WHERE t2.NR_PRC_PPL = bigint('${npj}') and t1.CD_TIP_RLC_PSS_PRC = 6 AND (CASE WHEN t1.DT_AFT_PSS_PRC<t2.DT_AJZT THEN 1 ELSE 0 END)= 0) t1 group by t1.NPJ`
        let Getobjeto = {
            method: 'POST',
            url: endereco,
            headers: objetoHeader,
            data: {query},
            strictSSL: false,
            withCredentials: true,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        }
        const e =  await axios(Getobjeto)
            .then(async (response) => {
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