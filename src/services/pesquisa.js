import axios from 'axios'
import https from "https"
// const local = "https://gs4935.intranet.bb.com.br:3803"
// const localAdress = window.location.href.toString()
// const url = localAdress.split("//")
// const url1 = url[1].split(":")
  const local = process.env.NODE_ENV=="production"? "https://gs4935.intranet.bb.com.br/contabilizar/api" : "https://localhost.bb.com.br:3803"
 const local1 = "https://gs4935.intranet.bb.com.br/gsvRouter/api"
export default {
    verificaToken: async () => {
        console.log(process.env.NODE_ENV)
        // var objetoHeader = {}
        // objetoHeader.cookie = req.headers.cookie;
        // objetoHeader.referer = "https://plataforma.atendimento.bb.com.br:49286"
        // delete objetoHeader['content-length']
        const hed = {}
        hed['Content-Type'] = 'application/json;charset=utf-8'
        const endereco = `${local}/validaToken`
        // const dados = { tipo, valor: dado }
        let Getobjeto = {
            method: 'get',
            url: endereco,
            headers: hed,
            strictSSL: false,
            withCredentials: true,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            }),

        }
        return await axios(Getobjeto)
    },
    pesquisa: async (tipo, dado) => {

        const hed = {}
        hed['Content-Type'] = 'application/json;charset=utf-8'
        const endereco = `${local}/pesquisaSumula?valor=${dado}&tipo=${tipo}`
        // const dados = { tipo, valor: dado }
        let Getobjeto = {
            method: 'get',
            url: endereco,
            // headers: hed,
            strictSSL: false,
            withCredentials: true,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        }
        return await axios(Getobjeto)
    },
    retornaSumula: async (sumula) => {
        const hed = {}
        hed['Content-Type'] = 'application/json;charset=utf-8'
        var endereco = local + "/retornoSumula"
        let Getobjeto = {
            method: 'get',
            url: endereco + `?sumulaCplt=${sumula}`,
            //data: jsondados,
            strictSSL: false,
            withCredentials: true,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        }
        // const dados = { tipo, valor: dado }
        return await axios(Getobjeto)
            .then(async (response) => {
                console.log(response)
                return response;
            }).catch(err => {
                console.log(err)
            })

    },
    retornaComplementos: async (sumula) => {
        const hed = {}
        hed['Content-Type'] = 'application/json;charset=utf-8'
        var endereco = local + "/complementos"
        let Getobjeto = {
            url: endereco,
            method: 'POST',
            withCredentials: true,
            data: { sumulaCplt: sumula },
            strictSSL: false,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        }
        // const dados = { tipo, valor: dado }
        return await axios(Getobjeto)
            .then(async (response) => {
                return response;
            }).catch(err => {
                console.log(err)
                return err
            })
    },
    recuperaDadosFunciVotante: async (funcionario) => {
        console.log('funcionario', funcionario)
        const hed = {}
        hed['Content-Type'] = 'application/json;charset=utf-8'
        var endereco = local + "/funcionario"
        let Getobjeto = {
            method: 'POST',
            url: endereco,
            withCredentials: true,
            data: { funcionario },
            strictSSL: false,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        }
        // const dados = { tipo, valor: dado }
        return await axios(Getobjeto)
            .then(async (response) => {
                return response;
            }).catch(err => {
                console.log(err)
                return err
            })

    },
    retornaSaldo: async (conta, agencia, mci) => {
        const hed = {}
        hed['Content-Type'] = 'application/json;charset=utf-8'
        var endereco = local + "/retornaSaldo"
        let Getobjeto = {
            method: 'POST',
            url: endereco,
            data: { agencia, conta, mci },
            strictSSL: false,
            withCredentials: true,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        }
        // const dados = { tipo, valor: dado }
        return await axios(Getobjeto)
            .then(async (response) => {
                return response;
            })
    },
    PesquisaDemandaProtocolo: async (tipo, protocolo) => {
        const hed = {}
        hed['Content-Type'] = 'application/json;charset=utf-8'
        var endereco = local + "/pesquisaDemandaProtocolo"
        let Getobjeto = {
            method: 'POST',
            url: endereco,
            data: { demanda: protocolo },
            strictSSL: false,
            withCredentials: true,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        }
        // const dados = { tipo, valor: dado }
        return await axios(Getobjeto)
            .then(async (response) => {
                return response;
            })

    }, PesquisaDemandaMci: async (mci) => {
        const hed = {}
        hed['Content-Type'] = 'application/json;charset=utf-8'
        var endereco = local + "/pesquisaDemandaMci"
        let Getobjeto = {
            method: 'POST',
            url: endereco,
            data: { mci },
            strictSSL: false,
            withCredentials: true,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        }
        // const dados = { tipo, valor: dado }
        return await axios(Getobjeto)
            .then(async (response) => {
                return response;
            })

    }, PesquisaOperacoesProtocolo: async (demanda) => {
        const hed = {}
        hed['Content-Type'] = 'application/json;charset=utf-8'
        var endereco = local + "/pesquisaOperacoesProtocolo"
        let Getobjeto = {
            method: 'POST',
            url: endereco,
            data: { demanda },
            strictSSL: false,
            withCredentials: true,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        }
        // const dados = { tipo, valor: dado }
        return await axios(Getobjeto)
            .then(async (response) => {
                return response;
            })

    }, adicionaConta: async (conta) => {
        const hed = {}
        hed['Content-Type'] = 'application/json;charset=utf-8'
        var endereco = local + "/adicionaConta"
        let Getobjeto = {
            method: 'POST',
            url: endereco,
            data: conta,
            strictSSL: false,
            withCredentials: true,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        }
        // const dados = { tipo, valor: dado }
        return await axios(Getobjeto)
            .then(async (response) => {
                return response;
            })

    }, recuperaConta: async (protocolo, sumula) => {
        const hed = {}
        hed['Content-Type'] = 'application/json;charset=utf-8'
        var endereco = local + "/recuperaConta"
        let Getobjeto = {
            method: 'POST',
            url: endereco,
            data: { protocolo, sumula },
            strictSSL: false,
            withCredentials: true,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        }
        // const dados = { tipo, valor: dado }
        return await axios(Getobjeto)
            .then(async (response) => {
                return response;
            })
    }, excluiConta: async (id) => {
        const hed = {}
        hed['Content-Type'] = 'application/json;charset=utf-8'
        var endereco = local + "/excluiConta"
        let Getobjeto = {
            method: 'POST',
            url: endereco,
            data: { id },
            strictSSL: false,
            withCredentials: true,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        }
        // const dados = { tipo, valor: dado }
        return await axios(Getobjeto)
            .then(async (response) => {
                return response;
            })
    }, editaConta: async (conta, agencia, id, protocolo) => {
        const hed = {}
        hed['Content-Type'] = 'application/json;charset=utf-8'
        var endereco = local + "/editaConta"
        let Getobjeto = {
            method: 'POST',
            url: endereco,
            data: { conta, agencia, id, protocolo},
            strictSSL: false,
            withCredentials: true,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        }
        // const dados = { tipo, valor: dado }
        return await axios(Getobjeto)
            .then(async (response) => {
                return response;
            })
    }, verificaExcluido: async (protocolo,demandas) => {
        const hed = {}
        hed['Content-Type'] = 'application/json;charset=utf-8'
        var endereco = local + "/verificaConta"
        let Getobjeto = {
            method: 'POST',
            url: endereco,
            data: { protocolo,demandas },
            strictSSL: false,
            withCredentials: true,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        }
        // const dados = { tipo, valor: dado }
        return await axios(Getobjeto)
            .then(async (response) => {
                return response;
            })
    }, atualizaValores: async (tipo, valor, numUnico, protocolo,npj, demandas) => {
        const hed = {}
        hed['Content-Type'] = 'application/json;charset=utf-8'
        var endereco = local + "/atualizaValores"
        let Getobjeto = {
            method: 'POST',
            url: endereco,
            data: { tipo, valor, numUnico, protocolo,npj, demandas },
            strictSSL: false,
            withCredentials: true,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        }
        return await axios(Getobjeto)
            .then(async (response) => {
                return response;
            })
    }, recuperaValores: async (numUnico, protocolo, demandas) => {
        const hed = {}
        console.log(numUnico, protocolo, demandas)
        hed['Content-Type'] = 'application/json;charset=utf-8'
        var endereco = local + "/recuperaValores"
        let Getobjeto = {
            method: 'POST',
            url: endereco,
            data: { numUnico, protocolo,demandas },
            strictSSL: false,
            withCredentials: true,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        }
        return await axios(Getobjeto)
            .then(async (response) => {
                return response;
            })
    },
    atualizaStatus: async (numUnico, protocolo, status, demandas) => {
        const hed = {}
        hed['Content-Type'] = 'application/json;charset=utf-8'
        var endereco = local + "/updateStatus"
        let Getobjeto = {
            method: 'POST',
            url: endereco,
            data: { numUnico, protocolo, status, demandas},
            strictSSL: false,
            withCredentials: true,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        }
        return await axios(Getobjeto)
            .then(async (response) => {
                return response;
            })
    },
    async getFile(sumula) {
        const hed = {}
        hed['Content-Type'] = 'application/json;charset=utf-8'
        var endereco = local + "/getFiles"
        let Getobjeto = {
            method: 'GET',
            url: endereco + "?sumula=" + sumula,
            strictSSL: false,
            withCredentials: true,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        }
        return await axios(Getobjeto)
            .then(async (response) => {
                return response.data;
            })
    }, async download(id) {
        const hed = {}
        hed['Content-Type'] = 'application/json;charset=utf-8'
        var endereco = local + "/download"
        let Getobjeto = {
            method: 'GET',
            url: endereco + "?id=" + id,
            strictSSL: false,
            withCredentials: true,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            }),
            responseType: 'blob',
        }
        return await axios(Getobjeto)
            .then(async (b, c) => {
                console.log(b, c)
                const m = b.headers['name-file']
                console.log(m)
                const myHeader = m
                var a = document.createElement('a');
                var url = window.URL.createObjectURL(b.data);
                a.href = url;
                a.download = myHeader;
                document.body.append(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
            })
    },
    async getObservacoes(id) {
        const hed = {}
        hed['Content-Type'] = 'application/json;charset=utf-8'
        var endereco = local + "/getobs"
        let Getobjeto = {
            method: 'POST',
            url: endereco,
            data: { id },
            strictSSL: false,
            withCredentials: true,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        }
        return await axios(Getobjeto)
            .then(async (response) => {
                return response;
            })
    },
    async salvaObservacoes(tx, id) {
        const hed = {}
        hed['Content-Type'] = 'application/json;charset=utf-8'
        var endereco = local + "/salvaobs"
        let Getobjeto = {
            method: 'POST',
            url: endereco,
            data: { tx, id },
            strictSSL: false,
            withCredentials: true,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        }
        return await axios(Getobjeto)
            .then(async (response) => {
                return response;
            })
    },
    async excluiObservacoes(id) {
        const hed = {}
        hed['Content-Type'] = 'application/json;charset=utf-8'
        var endereco = local + "/excluiobs"
        let Getobjeto = {
            method: 'POST',
            url: endereco,
            data: { id },
            strictSSL: false,
            withCredentials: true,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        }
        return await axios(Getobjeto)
            .then(async (response) => {
                return response;
            })
    },
    async consultaSas(conta, agencia, user, pwd) {

        const hed = {}
        hed['Content-Type'] = 'application/json;charset=utf-8'
        var endereco = local + "/consultaSas"
        let Getobjeto = {
            method: 'POST',
            url: endereco,
            data: { conta, agencia, user, pwd },
            strictSSL: false,
            withCredentials: true,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        }
        return await axios(Getobjeto)
            .then(async (response) => {
                return response;
            })
    },
    async getGecor() {

        const hed = {}
        hed['Content-Type'] = 'application/json;charset=utf-8'
        var endereco = local + "/getGecor"
        let Getobjeto = {
            method: 'get',
            url: endereco,
            strictSSL: false,
            withCredentials: true,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        }
        return await axios(Getobjeto)
            .then(async (response) => {
                return response;
            })
    },
    async buscaDemandasMci(mci) {
        const hed = {}
        hed['Content-Type'] = 'application/json;charset=utf-8'
        var endereco = local + "/pesquisaDemandaMci"
        let Getobjeto = {
            method: 'post',
            url: endereco,
            strictSSL: false,
            data: { mci },
            withCredentials: true,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            }), validateStatus: function (status) {
            return status >= 200 && status <= 403; // default
            },
        }
        return await axios(Getobjeto)
            .then(async (response) => {
                return response;
            })
    },
    async buscaDemandasGsv(mci) {
        const hed = {}
        hed['Content-Type'] = 'application/json;charset=utf-8'
        var endereco = local1 + "/gsv_pesquisa_mci_api"
        let Getobjeto = {
            method: 'post',
            url: endereco,
            strictSSL: false,
            data: { mci },
            withCredentials: true,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            }), validateStatus: function (status) {
                return status >= 200 && status <= 403; // default
                },
        }
        return await axios(Getobjeto)
            .then(async (response) => {
                return response;
            })
    },
    async buscaDemandasProtocolo(protocolo) {
        const hed = {}
        hed['Content-Type'] = 'application/json;charset=utf-8'
        var endereco = local + "/pesquisaDemandaProtocolo"
        let Getobjeto = {
            method: 'post',
            url: endereco,
            strictSSL: false,
            data: { protocolo },
            withCredentials: true,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        }
        return await axios(Getobjeto)
            .then(async (response) => {
                return response;
            })
    }, async deleteDemandasProtocolo(protocolo, sumula) {
        const hed = {};
        hed['Content-Type'] = 'application/json;charset=utf-8'
        var endereco = local + "/deleteDemandaSumula"
        let Getobjeto = {
            method: 'post',
            url: endereco,
            strictSSL: false,
            data: { protocolo, sumula },
            withCredentials: true,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        }
        return await axios(Getobjeto)
            .then(async (response) => {
                return response;
            })
    },
    async buscaDemandasid(id) {
        const hed = {}
        hed['Content-Type'] = 'application/json;charset=utf-8'
        var endereco = local + "/pesquisaDemandaId"
        let Getobjeto = {
            method: 'post',
            url: endereco,
            strictSSL: false,
            data: { id },
            withCredentials: true,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        }
        return await axios(Getobjeto)
            .then(async (response) => {
                return response;
            })
    },
    async vinculaDemandasSumula(sumula, id,protocolo) {
        const hed = {}
        hed['Content-Type'] = 'application/json;charset=utf-8'
        var endereco = local + "/vinculaDemandaSumula"
        let Getobjeto = {
            method: 'post',
            url: endereco,
            strictSSL: false,
            data: { id, sumula,protocolo },
            withCredentials: true,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        }
        return await axios(Getobjeto)
            .then(async (response) => {
                return response;
            })
    },
    async vinculaGsvSumula(sumula, id,protocolo) {
        const hed = {}
        hed['Content-Type'] = 'application/json;charset=utf-8'
        var endereco = local + "/vinculaGsvSumula"
        let Getobjeto = {
            method: 'post',
            url: endereco,
            strictSSL: false,
            data: { id, sumula,protocolo },
            withCredentials: true,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        }
        return await axios(Getobjeto)
            .then(async (response) => {
                return response;
            })
    },
    async retornaDemandasSumula(sumula) {
        const hed = {}
        hed['Content-Type'] = 'application/json;charset=utf-8'
        var endereco = local + "/retornaDemandaSumula"
        let Getobjeto = {
            method: 'post',
            url: endereco,
            strictSSL: false,
            data: { sumula },
            withCredentials: true,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        }
        return await axios(Getobjeto)
            .then(async (response) => {
                return response;
            })
    },
    async retornaNumUnicosDemanda(protocolo, tip) {
        const hed = {}
        hed['Content-Type'] = 'application/json;charset=utf-8'
        var endereco = local + "/pesquisaOperacoesDemanda"
        let Getobjeto = {
            method: 'post',
            url: endereco,
            strictSSL: false,
            data: { protocolo, tip },
            withCredentials: true,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        }
        return await axios(Getobjeto)
            .then(async (response) => {
                return response;
            })
    },
    async retornaPerguntas(sumula, prpt, protocolo) {
        const hed = {}
        hed['Content-Type'] = 'application/json;charset=utf-8'
        var endereco = local + "/retornaPerguntas"
        let Getobjeto = {
            method: 'post',
            url: endereco,
            strictSSL: false,
            data: { sumula,prpt,protocolo },
            withCredentials: true,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        }
        return await axios(Getobjeto)
            .then(async (response) => {
                return response;
            })
    },
    async gravarResposta(id,status,prpt,sumula,obs,protocolo) {
        const hed = {}
        hed['Content-Type'] = 'application/json;charset=utf-8'
        var endereco = local + "/gravarResposta"
        let Getobjeto = {
            method: 'post',
            url: endereco,
            strictSSL: false,
            data: { id,status,prpt,sumula,obs,protocolo},
            withCredentials: true,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            }),
             validateStatus: function (status) {
            return status >= 200 && status <= 403; // default
            },
         }
        return await axios(Getobjeto)
            .then(async (response) => {
                return response;
            })
    },
    async verificaStatus(protocolo) {
        const hed = {}
        hed['Content-Type'] = 'application/json;charset=utf-8'
        var endereco = local + "/checkStatus"
        let Getobjeto = {
            method: 'post',
            url: endereco,
            strictSSL: false,
            data: { protocolo},
            withCredentials: true,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        }
        return await axios(Getobjeto)
            .then(async (response) => {
                return response;
            })
    },
    async Update (protocolo,tip, oprs, sumula) {
        const hed = {}
        hed['Content-Type'] = 'application/json;charset=utf-8'
        var endereco = local + "/checkUpdate"
        let Getobjeto = {
            method: 'post',
            url: endereco,
            strictSSL: false,
            data: { protocolo,tip,oprs,prpt:1,sumula},
            withCredentials: true,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            }),validateStatus: function (status) {
                return status >= 200 && status <= 403; // default
            },
        }
        return await axios(Getobjeto)
            .then(async (response) => {
                return response;
            })
    },
    oprDetails: async ( numOpr, numEmpreendimento,numSubContrato) => {
        const hed = {}
        hed['Content-Type'] = 'application/json;charset=utf-8'
        var endereco = local + "/oprDetalhes"
        let Getobjeto = {
            method: 'POST',
            url: endereco,
            data: {numOpr, numEmpreendimento,numSubContrato },
            strictSSL: false,
            withCredentials: true,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        }
        return await axios(Getobjeto)
            .then(async (response) => {
                return response;
            })
    },
    oprRazao: async ( codigoProduto, codigoModalidade) => {
        const hed = {}
        hed['Content-Type'] = 'application/json;charset=utf-8'
        var endereco = local + "/oprRazao"
        let Getobjeto = {
            method: 'POST',
            url: endereco,
            data: {codigoProduto, codigoModalidade },
            strictSSL: false,
            withCredentials: true,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        }
        return await axios(Getobjeto)
            .then(async (response) => {
                return response;
            })
    },
    getVinculo: async (numUnico) => {
        const hed = {}
        hed['Content-Type'] = 'application/json;charset=utf-8'
        var endereco = local + "/vinculo"
        let Getobjeto = {
            method: 'POST',
            url: endereco,
            data: {numUnico},
            strictSSL: false,
            withCredentials: true,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        }
        return await axios(Getobjeto)
            .then(async (response) => {
                return response;
            })
    },
    atualizaRazao: async (codigoModalidade,codigoProduto,operacao,sigla,razao) => {
        const hed = {}
        hed['Content-Type'] = 'application/json;charset=utf-8'
        var endereco = local + "/updateRazao"
        console.log(codigoModalidade,codigoProduto,operacao,sigla,razao)
        let Getobjeto = {
            method: 'POST',
            url: endereco,
            data: {codigoModalidade,codigoProduto,operacao,sigla,razao},
            strictSSL: false,
            withCredentials: true,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        }
        return await axios(Getobjeto)
            .then(async (response) => {
                return response;
            })
    },
    setContaNpj:async function(npj,numUnico,conta,prefixo, valor, protocolo,sumula, custas, rateio){
        const hed = {}
        hed['Content-Type'] = 'application/json;charset=utf-8'
        var endereco = local + "/updateContaNpj"
        let Getobjeto = {
            method: 'POST',
            url: endereco,
            data: {npj,numUnico,conta,prefixo, valor,protocolo,sumula, custas, rateio},
            strictSSL: false,
            withCredentials: true,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        }
        return await axios(Getobjeto)
            .then(async (response) => {
                return response;
            })
    },
    getContaNpj:async function(npj,numUnico,protocolo,sumula){
        const hed = {}
        hed['Content-Type'] = 'application/json;charset=utf-8'
        var endereco = local + "/recuperaContaNpj"
        let Getobjeto = {
            method: 'POST',
            url: endereco,
            data: {npj,numUnico,protocolo,sumula},
            strictSSL: false,
            withCredentials: true,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        }
        return await axios(Getobjeto)
            .then(async (response) => {
                return response;
            })
    },
    openDilig:async function(itens,protocolo,sumula){
        const hed = {}
        hed['Content-Type'] = 'application/json;charset=utf-8'
        var endereco = local + "/abrirDiligencias"
        let Getobjeto = {
            method: 'POST',
            url: endereco,
            data: {itens,protocolo,sumula},
            strictSSL: false,
            withCredentials: true,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        }
        return await axios(Getobjeto)
            .then(async (response) => {
                return response;
            })
    },
    getDilig:async function(item,protocolo){
        const hed = {}
        hed['Content-Type'] = 'application/json;charset=utf-8'
        var endereco = local + "/getDiligencias"
        let Getobjeto = {
            method: 'POST',
            url: endereco,
            data: {item,protocolo},
            strictSSL: false,
            withCredentials: true,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        }
        return await axios(Getobjeto)
            .then(async (response) => {
                return response;
            })
    },
    getVinculosOpr:async function(query){
        const hed = {}
        hed['Content-Type'] = 'application/json;charset=utf-8'
        var endereco = local + "/getVinculoOpr"
        let Getobjeto = {
            method: 'POST',
            url: endereco,
            data: {query},
            strictSSL: false,
            withCredentials: true,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        }
        return await axios(Getobjeto)
            .then(async (response) => {
                return response;
            })
    },
    
    getDetalhesOpr:async function(numOpr){
        const hed = {}
        hed['Content-Type'] = 'application/json;charset=utf-8'
        var endereco = local + "/oprEmpreendimentos"
        let Getobjeto = {
            method: 'POST',
            url: endereco,
            data: {numOpr},
            strictSSL: false,
            withCredentials: true,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        }
        return await axios(Getobjeto)
            .then(async (response) => {
                return response;
            })
    },
    getDadosOpr:async function(numOpr){
        const hed = {}
        hed['Content-Type'] = 'application/json;charset=utf-8'
        var endereco = local + "/oprDados"
        let Getobjeto = {
            method: 'POST',
            url: endereco,
            data: {numOpr},
            strictSSL: false,
            withCredentials: true,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        }
        return await axios(Getobjeto)
            .then(async (response) => {
                return response;
            })
    },
    getRazao:async function(){
        const hed = {}
        hed['Content-Type'] = 'application/json;charset=utf-8'
        var endereco = local + "/oprRazao"
        let Getobjeto = {
            method: 'get',
            url: endereco,
            strictSSL: false,
            withCredentials: true,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        }
        return await axios(Getobjeto)
            .then(async (response) => {
                return response;
            })
    }, getRateio:async function(npj){
        const hed = {}
        hed['Content-Type'] = 'application/json;charset=utf-8'
        var endereco = local + "/getRateio"
        let Getobjeto = {
            method: 'post',
            data: {npj},
            url: endereco,
            strictSSL: false,
            withCredentials: true,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        }
        return await axios(Getobjeto)
            .then(async (response) => {
                return response;
            })
    },
    UpdateStatusRazao:async function(codProd, codMod,enq, status){
        const hed = {}
        hed['Content-Type'] = 'application/json;charset=utf-8'
        var endereco = local + "/oprRazaoConfirma"
        let Getobjeto = {
            method: 'POST',
            data: {codProd, codMod,enq, status},
            url: endereco,
            strictSSL: false,
            withCredentials: true,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        }
        return await axios(Getobjeto)
            .then(async (response) => {
                return response;
            })
    },
    getDadosSolucao:async function(sumula){
        const hed = {}
        hed['Content-Type'] = 'application/json;charset=utf-8'
        var endereco = "https://gs4935.intranet.bb.com.br/apiSumula/getDadosSolucao"
        let Getobjeto = {
            method: 'post',
            data: {codigoDossieRecuperacaoCredito:sumula, numeroSequencialPropostaSolucao:0},
            url: endereco,
            strictSSL: false,
            withCredentials: true,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        }
        return await axios(Getobjeto)
            .then(async (response) => {
                return response;
            })
    },
    getInfSumula:async function(sumula){
        const hed = {}
        hed['Content-Type'] = 'application/json;charset=utf-8'
        var endereco = "https://gs4935.intranet.bb.com.br/apiSumula/getInfSumula"
        let Getobjeto = {
            method: 'post',
            data: {codigoDossie:sumula},
            url: endereco,
            strictSSL: false,
            withCredentials: true,
            json: true,
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        }
        return await axios(Getobjeto)
            .then(async (response) => {
                return response;
            })
    },
}
