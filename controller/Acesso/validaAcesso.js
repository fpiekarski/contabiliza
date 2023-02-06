const pool = require('../Services/pool')
//const connectionMiddleware = require('./connection-middleware');
module.exports = {

    async validaAcesso(req, res, next) {
        const funci = req.session.chave;
        const ferramenta = req.body.ferramenta
        const prefixo = req.session.prefixo
        pool.query(`select * from api_mail.acesso where id = ${ferramenta}`, async (err, response) => {
            if (response[0]) {
                const acesso = response[0].acesso
                if (acesso == 1) {
                    next()
                }
            } else {
                pool.query(`insert into api_mail.log_envio (id_ferramenta, funci, prefixo, data, status, erro) values(${ferramenta},'${funci}',${prefixo} ,now(), false, "ferramenta não autorizada a enviar e-mail automaticamente")`, (err, info) => {
                    res.charset = 'UTF-8';
                    res.status(401).send({ erro: "ferramenta não autorizada a enviar e-mail automaticamente" })
                })
            }
        })
    }

    , async gravaLog(req, res, next) {
        var cookie = false;
        try {
            if (req.headers.cookie) {
                const head = req.headers.cookie.split(";");
                for await (h of head) {
                    const name = h.split("=")[0]
                    const valor = h.split("=")[1]
                    console.log(name)
                    if (name.trim() == "appFormaliza") {
                        cookie = true
                        break
                        return false;
                    }
                }
            }
        } catch (erro) {
            console.error(erro)
        }
        if (cookie == false ) {
            pool.query(`insert into Formalizador.log_acesso (chave, prefixo, data, ip ) values('${req.session.chave}',${req.session.prefixo},now(),'${req.session.ip}')`, (err, info) => {
                if (err) {
                    console.log(err)
                }
                console.log("gravou")
            })
        }
        next()
    }
}