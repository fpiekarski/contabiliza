const os = require('os')
const axios = require('axios');
const https = require('https');
const pool = require('../Services/pool')
module.exports = {
    async validaToken(req, res, next) {
        //req.session.chave = "f3163735"
        var header = req.headers
        var objetoHeader = {};
        console.log("dsdsdsd")
        objetoHeader.cookie = header.cookie
        delete objetoHeader["content-length"]
        objetoHeader.host = "sso13.intranet.bb.com.br";
        const ip = req.session.ip
        objetoHeader["user-agent"] = "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:60.0) Gecko/20100101 Firefox/60.0"
        var endereco = "https://sso.intranet.bb.com.br/sso/identity/json/attributes" //era = https://sso13.intranet.bb.com.br/sso/identity/json/attributes - alterado 11-11-2019

       
        return await axios({
            method: 'GET',
            url: endereco,
            headers: objetoHeader,
            strictSSL: false,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        }).then(async response => {
            if (response.status > 300) {
                res.charset = 'UTF-8';
                res.setHeader('Content-Type', 'application/json;charset=utf-8')
                // res.setHeader('Access-Control-Allow-Origin', 'https://localhost.bb.com.br:3804',)
                res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
                res.setHeader('Access-Control-Allow-Credentials', 'true')
                res.redirect("https://login.intranet.bb.com.br/sso/XUI/#login/&goto=https://" + req.headers.host + req.url)
                res.status(401).send({ erro: "Efetue login na intranet e tente novamente" });
                return false
            } else {
                const usuario = response.data.attributes;
                for await (let objeto of usuario) {
                    if (objeto.name == "cd-cmss-usu") {
                        req.session.comissao = objeto.values[0]
                    }
                    if (objeto.name == "chaveFuncionario") {
                        req.session.chave = objeto.values + ""
                    }
                    if (objeto.name == "cd-pref-depe") {
                        req.session.prefixo = objeto.values[0]
                    }
                    if (objeto.name == "nm-idgl") {
                        req.session.nome = objeto.values[0]
                    }
                }
                if (req.session.prefixo == 4935 ||req.session.prefixo == 8595 ||req.session.prefixo == 4011 || req.session.prefixo == 1962 ) {
                        next();
                } else {
                    var prefixo = req.session.prefixo
                    const funci = req.session.chave
                    const prf = req.session.prefixo
                    //***** necessario passr a base de dados para fins de log */
                    //******** */

                    pool.query(`insert into ConectaContabilizar.log_acesso (chave, prefixo, data, ip) values('${funci}',${prefixo},now(),'${ip}')`, (err, info) => {
                        res.charset = 'UTF-8';
                        res.setHeader('Content-Type', 'application/json;charset=utf-8')
                        res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
                        res.setHeader('Access-Control-Allow-Credentials', 'true')
                        //res.status(401).render('paginas/erro401', { funci, prf })
                        res.status(401).send({ erro: "acesso negado" , "funcionario" : funci})
                    });
                }
            }
        }).catch(err => {

            var prf = req.session.prefixo ? req.session.prefixo : null
            const funci = req.session.chave ? req.session.chave : null
            const ip = req.session.ip
            var sumula = req.session.sumulaCplt ? req.session.sumulaCplt : null
//***** necessario passr a base de dados para fins de log 
//******** */


            pool.query(`insert into ConectaContabilizar.log_app_erro (chave,data,ip,sumula,erro ) values (${funci}, 'now()',${ip},${sumula},${err}`), ((erro, response) => {

                res.charset = 'UTF-8';
                res.status(301).redirect("https://login.intranet.bb.com.br/sso/XUI/#login/&goto=https://" + req.headers.host + req.url)
            })
        })
    },
    async validaLogin(req, res, next) {

        // res.charset = 'UTF-8';
        // res.setHeader('Content-Type', 'application/json;charset=utf-8')
        // // res.setHeader('Access-Control-Allow-Origin', 'https://localhost.bb.com.br:3804',)
        // res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
        // res.setHeader('Access-Control-Allow-Credentials', 'true')
        // res.status(200).send({ status: true,msg: "Funcionário está logado" });
        var header = req.headers
        var objetoHeader = {};
        console.log("dsdsdsd")
        objetoHeader.cookie = header.cookie
        delete objetoHeader["content-length"]
        objetoHeader.host = "sso13.intranet.bb.com.br";
        const ip = req.session.ip
        objetoHeader["user-agent"] = "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:60.0) Gecko/20100101 Firefox/60.0"
        var endereco = "https://sso.intranet.bb.com.br/sso/identity/json/attributes" //era = https://sso13.intranet.bb.com.br/sso/identity/json/attributes - alterado 11-11-2019

       
        return await axios({
            method: 'GET',
            url: endereco,
            headers: objetoHeader,
            strictSSL: false,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        }).then(async response => {
            if (response.status > 300) {
                res.charset = 'UTF-8';
                // res.setHeader('Content-Type', 'application/json;charset=utf-8')
                // // res.setHeader('Access-Control-Allow-Origin', 'https://localhost.bb.com.br:3804',)
                // res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
                // res.setHeader('Access-Control-Allow-Credentials', 'true')
                // res.redirect("https://login.intranet.bb.com.br/sso/XUI/#login/&goto=https://" + req.headers.host + req.url)
                res.status(401).send({ erro: "Efetue login na intranet e tente novamente" });
                return false
            } else {
                const usuario = response.data.attributes;
                for await (let objeto of usuario) {
                    if (objeto.name == "cd-cmss-usu") {
                        req.session.comissao = objeto.values[0]
                    }
                    if (objeto.name == "chaveFuncionario") {
                        req.session.chave = objeto.values + ""
                    }
                    if (objeto.name == "cd-pref-depe") {
                        req.session.prefixo = objeto.values[0]
                    }
                    if (objeto.name == "nm-idgl") {
                        req.session.nome = objeto.values[0]
                    }
                }
                if (req.session.prefixo == 4935 ||req.session.prefixo == 8595||req.session.prefixo == 4011 ||req.session.chave == "F3163735" || req.session.prefixo == 1962) {
                    // pool.query(`insert into Formalizador.log_acesso (chave, prefixo, data, ip) values('${req.session.chave}',${prefixo},now(),'${ip}')`, (err, info) => {
                    //         if(err){

                    //             console.log(err)
                    //         }
                    var prefixo = req.session.prefixo
                    const funci = req.session.chave
                    const ip = req.session.ip
                    if(!req.sessionStore.log){
                        req.sessionStore.log = true

                        //***** necessario passr a base de dados para fins de log 
//******** */

                        pool.query(`insert into BASEDEDADOS.log_acesso (funci, prefixo, data, ip) values('${funci}',${prefixo},now(),'${ip}')`)
                        
                    }
                            res.charset = 'UTF-8';
                            // res.setHeader('Content-Type', 'application/json;charset=utf-8')
                            // res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
                            // res.setHeader('Access-Control-Allow-Credentials', 'true').
                            const comissoes = [16450,16280,16261,16157,16027]
                            var gerencial = false
                            if(comissoes.find(o=> o == req.session.comissao) ){
                               gerencial = true
                            }
                            res.status(200).send({ status: true,funci:funci,msg: "Funcionário está logado", gerencial,comissao:req.session.comissao, prefixo:req.session.prefixo });

                } else {
                    var prefixo = req.session.prefixo
                    const funci = req.session.chave
                    const prf = req.session.prefixo
                    if(!req.sessionStore.log){
                        req.sessionStore.log = true
                        pool.query(`insert into BASEDEDADOS.log_acesso (funci, prefixo, data, ip) values('${funci}',${prefixo},now(),'${ip}')`)
                        
                    }
                        res.charset = 'UTF-8';
                        // res.setHeader('Content-Type', 'application/json;charset=utf-8')
                        // res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
                        // res.setHeader('Access-Control-Allow-Credentials', 'true')
                        res.status(200).send({ status: false,msg: "Efetue login na intranet e tente novamente" });

                        //  res.status(401).send({ erro: "acesso negado" , "funcionario" : funci})
                }
            }
        }).catch(err => {

            var prf = req.session.prefixo ? req.session.prefixo : null
            const funci = req.session.chave ? req.session.chave : null
            const ip = req.session.ip
            var sumula = req.session.sumulaCplt ? req.session.sumulaCplt : null
//***** necessario passr a base de dados para fins de log 
//******** */

            pool.query(`insert into Contabilizar.log_app_erro (funci,data,ip,sumula,erro ) values (${funci}, 'now()',${ip},${sumula},${err}`), ((erro, response) => {

                res.charset = 'UTF-8';
                res.status(301).redirect("https://login.intranet.bb.com.br/sso/XUI/#login/&goto=https://" + req.headers.host + req.url)
            })
        })
    }
}