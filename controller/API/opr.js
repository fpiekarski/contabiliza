const axios = require('axios');
const https = require('https')
const pool = require('../Services/pool')


module.exports ={


    async oprDetails(req,res){
        // ComplementoSumula
        console.log('complementos')
        var endereco = "https://gs4935.intranet.bb.com.br/api/oprDetalhes"
        //}
        const cookies = req.headers.cookie
        const header = {}

        const {numOpr, numEmpreendimento,numSubContrato } = req.body
        header.cookie = cookies
        let Getobjeto = {
            method: 'POST',
            url: endereco,
            headers: header,
            data: {numOpr, numEmpreendimento,numSubContrato },
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
    },
    async oprRazao(req,res){
        const {codigoProduto, codigoModalidade} = req.body

        pool.query('select enq from ConectaContabilizar.CopProdGest where ativo = 1 and codProd = ? and codModalidade = ?',[codigoProduto,codigoModalidade],(err,response)=>{
            if(err){
                res.status(500).send("houve um erro ao consultar os dados")
            }else{
                res.status(200).send(response[0])
            }

        })

    },
    async updateRazao(req,res){
        const {codigoModalidade,codigoProduto,operacao,sigla,razao} = req.body
        const reg = /(\d){5}[-](\d){4}/g
        if(!razao.match(reg)){
            res.status(401).send("Atenção, enquadramento informado não está no padrão exigido, tente novamente")
            return false
        }
        pool.query('insert into ConectaContabilizar.CopProdGest  (ativo,codProd,codModalidade,sis,transacao, enq) values(?,?,?,?,?,?)',[0,codigoProduto,codigoModalidade,sigla, operacao,razao.replace('-','')],(err,response)=>{
            if(err){
                console.log(err)
                res.status(500).send("houve um erro ao consultar os dados")
            }else{
                pool.query("insert into ConectaContabilizar.tb_log_produto (cod_prd,cod_mod,razao,funci,ip,data,status) values(?,?,?,?,?,?,?)",[codigoProduto,codigoModalidade,razao,req.session.chave,req.session.ip,"now()",0],(err1,response1)=>{
                    
                    if(err1){
                        console.log(err1)
                    }
                    res.status(200).send({msg:"Título razão gravado com sucesso, aguarde validação"})

                })
            }

        })

    },
    async oprDetalhes(req,res){
        // ComplementoSumula
      
        var endereco = "https://gs4935.intranet.bb.com.br/api/oprEmpreendimentos"
        //}
        const cookies = req.headers.cookie
        const header = {}

        const Opr  = req.body.numOpr
        const numOpr = Opr.trim()
        header.cookie = cookies
        let Getobjeto = {
            method: 'POST',
            url: endereco,
            headers: header,
            data: {numOpr },
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

    async oprDados(req,res){
        // ComplementoSumula
      
        var endereco = "https://plataforma.atendimento.bb.com.br:49286/png-deoc-api/v3/api/png/consultar_dossie_credito_objeto_negocio/v2"
        //}
        const cookies = req.headers.cookie
        const header = {}

        const Opr  = req.body.numOpr
        const dados = {"numeroObjetoNegocioPesquisa":Opr,"codigoSistemaResponsavelPesquisa":"OPR","codigoPrefixoDepositoPesquisa":"4935","indicadorTratarRegraNegocio":0}
        const numOpr = Opr.trim()
        header.cookie = cookies
        let Getobjeto = {
            method: 'POST',
            url: endereco,
            headers: header,
            data: dados,
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
    async updateStatusRazao(req,res){
        const {codMod,codProd,enq,status} = req.body
        const comissoes = [16450,16280,16261,16157,16027]
        if(!comissoes.find(o=> o == req.session.comissao) ){
            res.status(403).send({msg:"Acesso negado, somente cargo gerencial pode confirmar o título razão"})
            return false
        }
        pool.query('update ConectaContabilizar.CopProdGest set ativo = ?, enq = ? where codProd = ? and codModalidade = ?',[status,enq,codProd,codMod],(err,response)=>{
            if(err){
                console.log(err)
                res.status(500).send("houve um erro ao consultar os dados")
            }else{
                pool.query("insert into ConectaContabilizar.tb_log_produto (cod_prd,cod_mod,razao,funci,ip,data,status) values(?,?,?,?,?,?,?)",[codProd,codMod,enq,req.session.chave,req.session.ip,"now()",status],(err1,response1)=>{
                    if(err1){
                        console.log(err1)
                    }
                    res.status(200).send({msg:"Título razão atualizado com sucesso"})

                })
           }
        })

    },
    async retornaStatusRazao(req,res){
        const comissoes = [16450,16280,16261,16157,16027]
        if(!comissoes.find(o=> o == req.session.comissao) ){
            res.status(403).send({msg:"Acesso negado, somente cargo gerencial pode consultar o título razão"})
            return false
        }
       pool.query('select * from ConectaContabilizar.CopProdGest',(err,response)=>{
        if(err){
            res.status(500).send("houve um erro ao consultar os dados")
        }else{
            res.status(200).send(response)
        }


       })

    }
}
