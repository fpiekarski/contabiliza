const pool = require('../Services/pool')

module.exports = {

    async adicionaContaNpj(req, res) {

        const { conta, prefixo, protocolo, sumula, numUnico,valor, npj,custas,rateio} = req.body;
        const sumulaSplit = sumula.split('/')
        const funci = req.session.chave
        pool.query('select * from ConectaContabilizar.repasse_log where protocolo = ? and ano_sumula = ? and prf_sumula = ? and nr_sumula = ? and numUnico = ? and npj = ?', [protocolo, sumulaSplit[0], sumulaSplit[1], sumulaSplit[2],  numUnico, npj], (erro, resposta) => {
            
            if(erro){
                res.status(500).send({msg: "houve um erro ao salvar os dados, por favor tente novamente"})
            }
            if (resposta && resposta[0]) {
                pool.query('delete from ConectaContabilizar.repasse_log where id  = ?',
                    [resposta[0].id], (err2, response2) => {
                        console.log(err2)
                    })
            }
            pool.query('insert into ConectaContabilizar.repasse_log (protocolo,ano_sumula,prf_sumula,nr_sumula,prf,conta,funci,data,numUnico,valor,npj,custas, rateio) values (?,?,?,?,?,?,?,now(),?,?,?,?,?)',
                [protocolo, sumulaSplit[0], sumulaSplit[1], sumulaSplit[2], prefixo, conta, funci, numUnico,valor, npj, custas, rateio], (err, response) => {
                    if (err) {
                        console.log(err)
                        res.status(500).send({ msg: "houve um erro, por favor tente novamente" })
                    } else {
                        console.log(response)
                        res.status(200).send({ msg: "Conta adicionada com sucesso" })
                    }
                })
        })
    },
    async recuperaContaNpj(req, res) {

        const { protocolo, sumula, npj, numUnico } = req.body;
        const sumulaSplit = sumula ? sumula.split('/') : protocolo.split('/')

        pool.query('select A.* from ConectaContabilizar.repasse_log A where A.protocolo = ? and A.numUnico = ? and  A.ano_sumula= ? and  A.prf_sumula = ? and  A.nr_sumula = ? and npj = ?',
            [protocolo,numUnico, sumulaSplit[0], sumulaSplit[1], sumulaSplit[2], npj], (err, response) => {
                if (err) {
                    console.log(err)
                    res.status(500).send({ msg: "houve um erro, por favor tente novamente" })
                } else {
                    res.status(200).send(response[0])
                }
            })
    },
    async excluiConta(req, res) {

        const { id } = req.body;
        pool.query("select *  from ConectaContabilizar.repasse_log where id  = ?", [id], (error, resposta) => {
            if (resposta[0]) {
                const { agencia, conta, protocolo, ano_sumula, prf_sumula, nr_sumula } = resposta[0];
                pool.query('insert into ConectaContabilizar.tb_conta_excluida (protocolo,agencia,conta,funci,data, ano_sumula, prf_sumula, nr_sumula) values(?,?,?,?,now(),?,?,?)', [protocolo, agencia, conta, req.session.chave, ano_sumula, prf_sumula, nr_sumula], (errInsert, respInsert) => {
                    if (errInsert) {
                        console.log(errInsert)
                    }
                });
            }
            pool.query('delete from ConectaContabilizar.conta_vinculada where id  = ?',
                [id], (err, response) => {
                    console.log(response)
                    if (err) {
                        console.log(err);
                        res.status(500).send({ msg: "houve um erro, por favor tente novamente" });
                    } else {
                        res.status(200).send(response);
                    }
                })
        })
    },
    async verificaExcluiConta(req, res) {

        const { conta, agencia, protocolo, sumula } = req.body;
        const sumulaSplit = sumula.split('/')

        pool.query('delete from ConectaContabilizar.conta_vinculada where agencia = ? and conta  = ? and (protocolo = ? or ano_sumula = ? and prf_sumula = ? and nr_sumula = ?)',
            [conta, agencia, protocolo, sumulaSplit[0], sumulaSplit[1], sumulaSplit[2]], (err, response) => {
                if (err) {
                    console.log(err)
                    res.status(500).send({ msg: "houve um erro, por favor tente novamente" })
                } else {
                    res.status(200).send(response)

                }
            })
    }, async editaConta(req, res) {

        const { conta, agencia, id } = req.body;
        const funci = req.session.chave

        pool.query('update ConectaContabilizar.conta_vinculada set agencia = ?,  conta  = ?, funci = ? , data = now() where id = ?',
            [agencia, conta, funci, id], (err, response) => {
                if (err) {
                    console.log(err)
                    res.status(500).send({ msg: "houve um erro, por favor tente novamente" })
                } else {
                    res.status(200).send(response)
                }
            })
    },
    async verificaExcluido(req, res) {

        const { protocolo, demandas } = req.body;
        const sumulaSplit = protocolo.split('/')

        pool.query('select * from ConectaContabilizar.tb_conta_excluida where protocolo =? and ano_sumula = ? and prf_sumula =? and nr_sumula = ?', [demandas, sumulaSplit[0], sumulaSplit[1], sumulaSplit[2]], (err, response) => {
            if (err) {
                console.log(err)
                res.status(500).send({ msg: "houve um erro, por favor tente novamente" })
            } else {
                res.status(200).send(response)

            }
        })
    },
    async verificaGecor(req, res) {

        pool.query('select * from ConectaContabilizar.tb_gecor', (err, response) => {
            if (err) {
                console.log(err)
                res.status(500).send({ msg: "houve um erro, por favor tente novamente" })
            } else {
                res.status(200).send(response)
            }
        })
    },
   
}