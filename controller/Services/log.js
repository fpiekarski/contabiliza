const pool = require('../Services/pool')
//const connectionMiddleware = require('./connection-middleware');
module.exports = {


    async gravaLog(req, tip, dados) {

        return new Promise((resolve, reject) => {



            pool.query(`insert into ConectaContabilizar.log_app (chave, data, ip, tip, dados ) values('${req.session.chave}',now(),'${req.session.ip}', ${tip}, '${dados}')`, (err, info) => {
                if (err) {
                    console.log(err)
                }
            })
            resolve(true)
        }
        )
    },
    async gravaErro(req, sumula, erro) {

        return new Promise((resolve, reject) => {


            pool.query(`insert into ConectaContabilizar.log_app_erro (chave, data, ip, sumula, erro ) values('${req.session.chave}',now(),'${req.session.ip}', ${req.body.tip}, '${erro}')`, (err, info) => {
                if (err) {
                    console.log(err)
                }
            })
            resolve(true)
        }
        )
    },
    async gravaAcesso(req) {

        return new Promise((resolve, reject) => {
            const ip = req.session.ip
            if (!req.session.log) {

                pool.query(`insert into ConectaContabilizar.log_acesso (chave, prefixo, data, ip) values('${req.session.chave}',${req.session.prefixo},now(),'${ip}')`, (err, info) => {
                    if (err) {
                        console.log(err)
                    }
                })
                req.session.log = true
                resolve(true)
            } else {
                resolve(true)
            }
        }
        )
    }
}