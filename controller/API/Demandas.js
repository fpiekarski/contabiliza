const pool = require('../Services/pool')
const pool234 = require('../Services/pool234')
const getStatusCheck = require('../CheckList/getStatusCheck')
const getVinculos = require('../CheckList/getVinculos')

module.exports = {

    async consultaDemandaProtocolo(req, res) {

        const { protocolo } = req.body
        pool.query('SELECT * FROM demandas_gs.t100_demanda WHERE protocolo = ?', [protocolo], (err, response) => {
            if (err) {
                res.status(500).send({ msg: "houve um erro ao recuperar os dados, por favor tente novamente" })
            } else {
                res.status(200).send(response)
            }
        })
    },
    async consultaDemandaId(req, res) {

        const { id } = req.body
        pool.query('SELECT * FROM demandas_gs.t100_demanda WHERE id = ?', [id], (err, response) => {
            if (err) {
                res.status(500).send({ msg: "houve um erro ao recuperar os dados, por favor tente novamente" })
            } else {
                res.status(200).send(response)
            }
        })
    },
    async consultaDemandaMCI(req, res) {

        const { mci } = req.body
        const query = `SELECT
        demandas_gs.t100_demanda.PROTOCOLO,
        demandas_gs.t520_etapa.NOME AS 'ETAPA',
        demandas_gs.t100_demanda.MCI_PRINCIPAL,
        demandas_gs.t100_demanda.ID,
        demandas_gs.t100_demanda.PREF_DEMANDANTE
        FROM demandas_gs.t100_demanda
        LEFT JOIN demandas_gs.t520_etapa ON demandas_gs.t100_demanda.ETAPA = demandas_gs.t520_etapa.ID
        LEFT JOIN demandas_gs.t105_operacao ON demandas_gs.t100_demanda.ID = demandas_gs.t105_operacao.t100_demanda_ID
        WHERE
        demandas_gs.t100_demanda.MCI_PRINCIPAL = ? AND /*MCI a ser pesquisado */
        demandas_gs.t100_demanda.t502_detalhe_servico_ID IN  /*Limitação da pesquisa para os detalhes de serviço da Área Crédito*/
        (SELECT demandas_gs.t502_detalhe_servico.ID
        FROM demandas_gs.t502_detalhe_servico
        WHERE demandas_gs.t502_detalhe_servico.t504_area_servico = 4) AND
        demandas_gs.t100_demanda.ETAPA NOT IN (1,2,10,11,97,98,99) AND /*Exclusão das Etapas que não interessam*/
        demandas_gs.t100_demanda.PROTOCOLO IS NOT NULL group by demandas_gs.t100_demanda.PROTOCOLO `
        //'SELECT * FROM demandas_gs.t100_demanda WHERE mci_principal = ?'
        // res.status(200).send([])
        // return false;
        pool.query(query, [mci], (err, response) => {
            if (err) {
                res.status(500).send({ msg: "houve um erro ao recuperar os dados, por favor tente novamente" })
            } else {
                res.status(200).send(response)
            }
        })
    },
    async consultaOperacoesDemanda(req, res) {

        const { protocolo, tip } = req.body
        if (tip == 'DEMANDAS') {

            pool.query('SELECT A.id,A.mci_principal, B.NR_CONTRATO, B.VALOR, CAST(B.NR_UNICO AS CHAR) AS NR_UNICO  FROM demandas_gs.t100_demanda A LEFT JOIN demandas_gs.t105_operacao B ON A.id = B.t100_demanda_id WHERE A.protocolo = ?', [protocolo], (err, response) => {
                if (err) {
                    res.status(500).send({ msg: "houve um erro ao recuperar os dados, por favor tente novamente" })
                } else {
                    res.status(200).send(response)
                }
            })
        } else {
            pool234.query('select * from gsv_num_unico.gsv_nr_unico  where nr_prc = ?', [protocolo], (err, response) => {
                if (err) {
                    res.status(500).send({ msg: "houve um erro ao recuperar os dados, por favor tente novamente" })
                } else {
                    res.status(200).send(response)
                }
            })
        }
    },
    async vinculaDemandaSumula(req, res) {
        const { sumula, id, protocolo } = req.body
        const sumulaSplit = sumula.split('/')
        const ano = sumulaSplit[0]
        const prf = sumulaSplit[1]
        const nr = sumulaSplit[2]
        if (await getVinculos.verificaVinculosDemandas(res, id, ano,prf,nr)) {
            res.status(403).send({ status: false, msg: "O protocolo já está vinculado, não é possível vinculá-lo novamente a mesma súmula" })
            return false;
        }

        pool.query('insert into ConectaContabilizar.vinc_demandas (status,ano_sumula,prf_sumula, nr_sumula,demandas,funci,data) values (1,?,?,?,?,?,now())', [ano, prf, nr, id, req.session.chave], (err, response) => {
            pool.query('select * from demandas_gs.t100_demanda where id = ?', [id], (err1, response1) => {
                if (err1) {
                    console.log(err1)
                }
                if (err) {
                    res.status(500).send({ status: false, msg: "houve um erro ao recuperar os dados, por favor tente novamente" })
                } else {
                    res.status(200).send({ status: true, msg: "Protocolo vinculado com sucesso", protocolo: response1 })

                }
            })
        })
    },
    async vinculaGsvSumula(req, res) {
        const { sumula, id } = req.body
        const sumulaSplit = sumula.split('/')
        const ano = sumulaSplit[0]
        const prf = sumulaSplit[1]
        const nr = sumulaSplit[2]
        if (await getVinculos.verificaVinculosGsv(res, id, ano,prf,nr)) {
            res.status(403).send({ status: false, msg: "O protocolo já está vinculado, não é possível vinculá-lo novamente a mesma súmula" })
            return false;
        }

        pool.query('insert into ConectaContabilizar.vinc_demandas (status,ano_sumula,prf_sumula, nr_sumula,protocolo,funci,data) values (1,?,?,?,?,?,now())', [ano, prf, nr, id, req.session.chave], (err, response) => {
            if (err) {
                res.status(500).send({ status: false, msg: "houve um erro ao recuperar os dados, por favor tente novamente" })
            } else {
                res.status(200).send({ status: true, msg: "Protocolo vinculado com sucesso", protocolo: { PROTOCOLO: id } })
            }
        })
    },
    async updateInativaDemanda(req, res) {
        const { sumula, id, protocolo } = req.body
        const sumulaSplit = sumula.split('/')
        const ano = sumulaSplit[0]
        const prf = sumulaSplit[1]
        const nr = sumulaSplit[2]
        pool.query("update ConectaContabilizar.vinc_demandas set status = 0 where ano_sumula = ? and prf_sumula = ? and nr_sumula = ? and (demandas = ? or protocolo = ?)", [ano, prf, nr, protocolo,protocolo], (error, resposta) => {
            pool.query("update ConectaContabilizar.tb_rpst set ativa = 0 where protocolo = ? and ano_sumula = ? and nr_sumula = ? and prf_sumula = ?", [protocolo, ano, nr, prf], (error1, resposta1) => {

                res.status(200).send({ status: true, msg: "Protocolo desvinculado com sucesso", protocolo: resposta1 })

            })
        })

    },
    async updateInativaPergunta(req, res) {
        const { sumula, id, protocolo } = req.body
        const sumulaSplit = sumula.split('/')
        const ano = sumulaSplit[0]
        const prf = sumulaSplit[1]
        const nr = sumulaSplit[2]
        pool.query("update ConectaContabilizar.tb_rpst set ativa = 0 where protocolo = ?", [protocolo], (error1, resposta1) => {

        })

    },
    async retornaProtocoloSumula(req, res) {

        const { sumula } = req.body
        const sumulaSplit = sumula.split('/')
        const ano = sumulaSplit[0]
        const prf = sumulaSplit[1]
        const nr = sumulaSplit[2]
        pool.query('SELECT * from ConectaContabilizar.vinc_demandas A left join demandas_gs.t100_demanda B on A.demandas = B.id  where  ano_sumula = ? and prf_sumula = ? and nr_sumula = ? and status = 1', [ano, prf, nr], (err, response) => {
            if (err) {
                res.status(500).send({ msg: "houve um erro ao recuperar os dados, por favor tente novamente" })
            } else {
                res.status(200).send(response)
            }
        })
    },
    async retornaDiligenciasNpj(req, res) {

        const { item, protocolo } = req.body
        const anoNpj = item.numNpj.substring(0, 4)
        const nrNpj = item.numNpj.substring(4)
        pool.query('SELECT * from ConectaContabilizar.repasse_log where npj = ? and protocolo = ? and gerado = 1', [item.numNpj, protocolo], (err, response) => {
            if (err) {
                res.status(500).send({ msg: "houve um erro ao recuperar os dados, por favor tente novamente" })
            } else {
                if (response[0]) {

                    res.status(200).send({ localizado: true, dados: response[0] })
                } else {
                    res.status(200).send({ localizado: false })
                }
            }
        })
    },

    async abrirDiligenciaRepasse(req, res, next) {
        console.log('abrirDiligenciaRepasse')
        const { itens, protocolo, sumula } = req.body
        var insert = []
        const sumulaSplit = sumula.split('/')
        const ano = sumulaSplit[0]
        const prf = sumulaSplit[1]
        const nr = sumulaSplit[2]

        for await (o of itens) {

            const anoNpj = o.numNpj.substring(0, 4)
            const nrNpj = o.numNpj.substring(4)
            await new Promise((resolve, reject) => {

                pool.query('SELECT * from ConectaContabilizar.repasse_log where npj = ? and protocolo = ? and gerado = 1', [o.numNpj, protocolo], (err, response) => {
                    if (err) {
                        res.status(500).send({ msg: "houve um erro ao recuperar os dados, por favor tente novamente" })
                    } else {
                        if (response[0]) {

                            resolve(false);
                        } else {

                            insert.push(`('${protocolo}',${anoNpj},${nrNpj},'${o.honorarios}',${ano},${prf},${nr},'${req.session.chave}',now(),${o.custas})`)
                            resolve(true)
                        }
                    }
                })
            })
        }
        const ins = insert.toString()
        if (ins.length == 0) {
            res.status(200).send({ status: false, msg: "Não há itens pendentes para abrir diligências" })
            return false;
        }
        pool.query("insert into ConectaContabilizar.tb_diligencias (protocolo,ano_npj, nr_npj,vl_honorarios,ano_sumula,prf_sumula,nr_sumula,funci,data,vl_custas) values " + ins, (errors, response) => {

            if (errors) {
                console.log(errors)
                res.status(500).send({ status: false, msg: "houve um erro ao abrir diligências" })
            } else {
                console.log('inserido')

                next()
            }

            //insertDemandas.push(`('${protocolo}',${anoNpj},${nrNpj},'${o.honorarios}',${ano},${prf},${nr},'${req.session.chave}',now(),${o.custas})`)
        })
        /* ID da ocorrência a ser aberta no demandas*/
        //tip ocorrencia = 26239 -repasse honorarios / 26240 - repasse custas

    },
    async gerarRepasse(req, res) {
        console.log("gerarRepasse")
        try {
            const { protocolo } = req.body
            var insert = []
            var insertGsv = []
            var t = await new Promise((resolve, reject) => {
                pool.query('SELECT max(sequencial) as lastID FROM gecor.tmp_atualizar_protocolo WHERE protocolo = ?', [protocolo], (error, responser) => {
                    resolve(responser[0].lastID)
                }
                )
            }
            )
            pool.query(`SELECT *,SUM(B.honorarios) AS hon, SUM(B.custas) AS cust FROM ConectaContabilizar.repasse_log  A LEFT JOIN ConectaContabilizar.vl_oprs B ON A.numUnico = B.numUNico AND A.protocolo = B.demandas AND A.npj = B.npj WHERE A.protocolo = ?
        AND ISNULL(A.gerado)  GROUP BY A.npj`, [protocolo], async (err, response) => {
                var updt = ""
                if (response.length == 0) {
                    res.status(200).send({ status: false, msg: "Não há itens pendentes para gerar repasse" })
                    return false
                }
                // if (protocolo.toString().match(/([A-Z]{3}\.[\d{4}])\w/g)) {
                for await (d of response) {
                    t++
                    const vlHonorarios = parseFloat(d.hon).toFixed(2)
                    const tx = ` Protocolo: ${protocolo}
                    NPJ: ${d.npj}
                    Prefixo: ${d.prf}
                    CV: ${d.conta}
                    Valor: R$ ${vlHonorarios}
                    `
                    insert.push(`(${t},'${protocolo}','',26239,'${tx}','${req.session.chave}',0,1,1,4935,0)`)

                    if (d.cust) {
                        t++
                        const vlCustas = parseFloat(d.cust).toFixed(2)
                        const txC = ` Protocolo: ${protocolo}
                        Prefixo: ${d.prf}
                        CV: ${d.conta}
                        Valor: R$${vlCustas}
                        `
                        insert.push(`(${t},'${protocolo}','',26240,'${txC}','${req.session.chave}',0,1,1,4935,0)`)

                    }
                    // {
                    //     "nrPrc": protocolo,
                    //     "cdAgp": 51796,
                    //     "cdOcr": 34005,
                    //     "imp": false,
                    //     "rms": false,
                    //     "obs": "#testeapi"
                    //    }
                }
                pool.query("INSERT INTO ConectaContabilizar.repasse_honorarios (protocolo, npj, prf, conta, rateio, hon, cust)   SELECT A.protocolo, A.npj, A.prf, A.conta, A.rateio, SUM(B.honorarios) AS hon, SUM(B.custas) AS cust FROM ConectaContabilizar.repasse_log  A LEFT JOIN ConectaContabilizar.vl_oprs B ON A.numUnico = B.numUNico AND A.protocolo = B.demandas AND A.npj = B.npj WHERE A.protocolo = ? AND ISNULL(A.gerado) GROUP BY A.npj", [protocolo],
                    (err2, response2) => {
                        if (err2) {

                            console.log(err2)
                        }

                        const ins = insert.toString()
                        console.log(ins)
                        pool.query('update ConectaContabilizar.repasse_log set gerado = 1 where protocolo = ?', [protocolo], (err2, response2) => {
                            if (err2) {
                                res.status(200).send({ status: false, msg: "houve um erro ao atualizar" })
                            } else {
                                res.status(200).send({ status: true, msg: "Diligencias solicitadas com sucesso, aguarde o processamento automatizado na próxima rodada" })
                            }
                        })
                        if (protocolo.toString().match(/([A-Z]{3}\.[\d{4}])\w/g)) {

                            pool.query(`insert into gecor.tmp_atualizar_protocolo (sequencial,protocolo,id_t901,id_diligencia,observacao, responsavel,concluir,registrar_dilig,informativo,pref_diligencia,baixar_dilig) values ${ins}`, (err1, response1) => {
                                
                                if (err1) {
                                    res.status(200).send({ status: false, msg: "houve um erro ao atualizar" })
                                } 
                            })
                        }
                    })
            })
        } catch (e) {
            console.log(e)
            res.status(500).send({ status: false, msg: "houve um erro ao gerar repasse" })
        }
    },
    gerarDiligGsv(req, texto, protocolo) {
        const agrupo_ocr = 1634
        const cd_ocr = 40075


    }
}