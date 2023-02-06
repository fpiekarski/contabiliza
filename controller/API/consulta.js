const axios = require('axios');
const { set } = require('core-js/fn/reflect');
const https = require('https')
const iconv = require('iconv-lite')
const pool = require('../Services/pool')

module.exports = {

    async recuperaSumula(req, res, next) {

        var endereco = "https://gs4935.intranet.bb.com.br/Conecta/pesquisaSumula"
        //}
        const valor = req.query.valor
        const tipo = req.query.tipo
        const cookies = req.headers.cookie
        const header = {}
        const param = { tipo: tipo, valor: valor }

        header.cookie = cookies
        var prefixo = req.session.prefixo
        const funci = req.session.chave
        const ip = req.session.ip
        try{
        pool.query(`insert into ConectaContabilizar.log_pesquisa (funci, prefixo, data, ip,param,pesquisa) values(?,?,now(),?,?,?)`,[funci,prefixo,ip,tipo,valor],async (err, info) => {
        console.log(err)
            var e = await axios({
            method: 'get',
            url: endereco + `?valor=${valor}&tipo=${tipo}`,
            headers: header,
            strictSSL: false,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            }),
            responseType: 'arraybuffer'
        }).then(function (buffer,a) {
            //var iconv = new Iconv( 'ISO-8859-1','UTF-8');
            const setheader = buffer.headers["set-cookie"]
            if(setheader){
    
                const setCookie = setheader[0].split(";")
                res.setHeader("set-cookie",setCookie[0]+";Path=/; Domain=.bb.com.br;")
            }  // const decoder = new TextDecoder('ISO-8859-1');
            const text = iconv.decode(buffer.data,"ISO-8859-1");
            return JSON.parse(text);
        }).catch((erro) => {
            console.log(erro)
        })
        
        if (e[0].pep.data && e[0].pep.data.perfilSimplesPF) {

            req.session.mci = e[0].pep.data.perfilSimplesPF.codigoCliente
        } else {
            req.session.mci = e[0].pep.data.perfilSimplesPJ.codigoCliente

        }
        res.send(e)
    })
}catch(er){
    res.status(500).send({msg: "houve um erro ao processar essa requisição"})
}
    },
    async recuperaPropostasSumula(req, res, next) {

        if (req.body.id) {
            var idsumula = req.body.id
        } else {

            const nr = req.body.nr
            const { ano } = req.body
            var idsumula = ano + ("000000" + nr).slice(-6)
        }

        const endereco = "https://plataforma.atendimento.bb.com.br:49286/drc-sumula-api/v3/api/drc/listar_propostas_solucao_ambiente_negocial/v4?codigoDossieRecuperacaoCredito=" + idsumula + "&numeroSequencialGrupo=0"
        const cookies = req.headers.cookie
        const header = {}
        header.cookie = cookies
        var e = await axios({
            method: 'get',
            url: endereco,
            headers: header,
            strictSSL: false,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        }).then(async e => {
            const oprs = req.session.oprDric
            const nrsUnico = []
            if (oprs) {

                for await (i of oprs) {
                    nrsUnico.push(i.numeroUnicoOperacao)
                }
            }
            return new Promise((resolve, reject) => {
                pool.query('select * from Formalizador.tb_new_nr_opr where old_nu in (?)', [nrsUnico], (err, response) => {

                    res.send({ propostas: e.data, clientes: req.session.ClientesPropostasSumula, opr: req.session.oprDric, newNr: response })
                })
            })
        }).catch((erro) => {
            console.log(erro)
            res.status(500).send("Sessão Expirada")
        })
    },
    async SetMciPropostaSumula(req, res, ano, prf, nr) {
        const idsumula = ("000000" + nr).slice(-6)
        const endereco = "https://plataforma.atendimento.bb.com.br:49286/drc-sumula-api/v3/api/drc/listar_propostas_solucao_ambiente_negocial/v4?codigoDossieRecuperacaoCredito="
            + ano + idsumula + "&numeroSequencialGrupo=0"
        const cookies = req.headers.cookie
        const header = {}
        header.cookie = cookies
        var e = await axios({
            method: 'get',
            url: endereco,
            headers: header,
            strictSSL: false,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        }).catch((erro) => {
            console.log(erro)
        })
        const proposta = e.data.data.listaTabelaOcorrencia.find(r => (r.numeroSequencialGrupoSolucao == [req.session.prpt]))
        req.session.mci = proposta.codigoCliente
    },
    async getSumulaCompleta(req, res) {
        const cookies = req.headers.cookie
        const header = {}
        const getters = []
        header.cookie = cookies
        console.log('entrou na pesquisa')
        var endereco = "https://gs4935.intranet.bb.com.br/Conecta/"
        const sumulaCplt = req.query.sumulaCplt
        const url = ["DetalhesSumulaFormalizador", "ComplementoSumula"]
        req.session.protocolo = sumulaCplt
        header.referer = "https://plataforma.atendimento.bb.com.br:49286"
        const sumula = sumulaCplt.split('/')[0] + sumulaCplt.split('/')[2]
        url.map((item, index) => {
            let Getobjeto = {
                method: 'get',
                url: endereco + item + `?sumula=${sumula}&sumulaCplt=${sumulaCplt}`,
                //data: jsondados,
                headers: header,
                strictSSL: false,
                json: true,
                httpsAgent: new https.Agent({
                    rejectUnauthorized: false
                })
            }
            getters.push(axios(Getobjeto))
        })
        var e = [];
        console.log("mandando request")
        e = await axios.all(getters)
            .then(async (response) => {
                // res.setHeader('Content-Type', 'application/json;charset=utf-8')
                // res.setHeader('Access-Control-Allow-Origin', '*',)
                // res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
                // res.setHeader('Access-Control-Allow-Credentials', 'true')

                res.status(200).send([response[0].data, response[1].data])
            }).catch(erro =>{
                console.log(erro)
            })

    }, async recuperaComplementos(req,res){
        // ComplementoSumula
        console.log('complementos')
        var endereco = "https://gs4935.intranet.bb.com.br/Conecta/ComplementoSumula"
        //}
        const sumula = req.body.sumulaCplt
        const cookies = req.headers.cookie
        const header = {}


        header.cookie = cookies
        var e = await axios({
            method: 'get',
            url: endereco + `?idSumula=${sumula}`,
            headers: header,
            strictSSL: false,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            }),
            responseType: 'arraybuffer'
        }).then(function (buffer) {
            //var iconv = new Iconv( 'ISO-8859-1','UTF-8');
                // const decoder = new TextDecoder('ISO-8859-1');
            const text = iconv.decode(buffer.data,"ISO-8859-1");
            return JSON.parse(text);
        }).catch((erro) => {
            console.log(erro)
        })

        // res.setHeader('Access-Control-Allow-Origin', '*',)
        // res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
        // res.setHeader('Access-Control-Allow-Credentials', 'true')
        // res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
        res.setHeader('Content-Type', 'text/plain;charset=ISO-8859-1')
        res.setHeader('Transfer-Encoding', 'chunked')
        res.send(e)
    }
}