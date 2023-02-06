const pool = require('../Services/pool')
const controlePerguntas = require('./getStatusCheck')
module.exports = {

    async retornaPerguntas(req, res) {
        const { protocolo, sumula, prpt } = req.body;
        const sumulaSplit = sumula.split('/')

        pool.query(`SELECT A.id_perg as id,B.*, C.*,D.*, E.*, F.tx_grupo, F.url, F.id_grupo, G.ordem AS grupoOrdem, H.id AS tip_dilig,H.tx_tipo,H.texto AS tx_dilig,H.impede FROM Sumula.tb_ctrl_pgta A 
                    LEFT JOIN Sumula.tb_fase B ON A.id_fase = B.id_fase 
                    LEFT JOIN Sumula.tb_itmt C ON A.id_instr = C.id_itmt
                    LEFT JOIN Sumula.tb_pgta D ON A.id_perg = D.id_pgta
                    LEFT JOIN (SELECT * FROM ConectaContabilizar.tb_rpst WHERE ativa= TRUE) AS E ON A.id_perg = E.id_pgta 
                    AND E.ano_sumula = ? AND E.id_sumula = ?  AND E.prf_sumula = ? AND E.id_fase = 2 AND E.id_itmt = 156
                    AND E.id_prpt = ? and protocolo = ? LEFT JOIN  Sumula.tb_grupo F ON A.id_grupo = F.id_grupo
                    LEFT JOIN Sumula.tb_ord_grupo G ON A.id_fase = G.id_fase AND A.id_grupo = G.id_grupo
                    LEFT JOIN Sumula.tip_diligencia H ON D.tipoDiligencia = H.id
                    WHERE C.id_itmt = 156 AND C.id_fase = 2 AND A.ativo = TRUE AND
                    D.ativa = TRUE AND A.id_grupo IN( 25 ) AND F.tip_grupo = 1  ORDER BY G.ordem, A.id_grupo,A.ordem;`, [sumulaSplit[0], sumulaSplit[2], sumulaSplit[1], prpt, protocolo], (err, response) => {
            if (err) {
                res.status(500).send("houve um erro")
            } else {
                res.status(200).send(response)
            }
        })
    },
     gravarResposta: async function(req, res) {
        const { id, status, prpt, sumula, obs, protocolo } = req.body;
        const sumulaSplit = sumula.split('/');
        const ano = sumulaSplit[0]
        const prf = sumulaSplit[1]
        const nr = sumulaSplit[2]
        const funci = req.session.chave
        if (!protocolo) {
            res.status(403).send({ msg: "Atenção, protocolo não informado" })
            return false;
        }
        
        if (await controlePerguntas.verificaStatusCheck(protocolo)) {
            res.status(403).send({ msg: "Atenção, CheckList já está finalizado" })
            return false
        }
        if (status == 3 && (obs == null || obs == "" || obs.length < 6)) {
            res.status(403).send({ msg: "É necessário justificar a resposta" })
            return false
        }
        if (!id || !status || !prpt || !sumula || !protocolo) {
            res.status(403).send({ msg: "houve um erro ao gravar a resposta, dado indispensável faltante" })
            return false
        }
        pool.query("update ConectaContabilizar.tb_rpst set ativa = 0 where ano_sumula =? and id_sumula=? and prf_sumula=? and id_fase=? and id_itmt=? and id_prpt=? and id_pgta = ? and protocolo = ?", [ano, nr, prf, 2, 156, prpt, id, protocolo], (err1) => {
            if (err1) {
                res.status(500).send({ msg: "houve um erro ao gravar a resposta, por favor tente novamente" })
            }
            pool.query("insert into ConectaContabilizar.tb_rpst (ano_sumula, id_sumula, prf_sumula, id_fase,id_itmt,id_prpt,id_pgta,rpst,tx_obs,funci,data,ativa,protocolo) values (?,?,?,?,?,?,?,?,?,?,now(),1,?)",
                [ano, nr, prf, 2, 156, prpt, id, status, obs, funci, protocolo], (err) => {
                    if (err) {
                        res.status(500).send({ msg: "houve um erro ao gravar a resposta, por favor tente novamente" })
                    } else {
                        res.status(200).send({ msg: "Resposta gravada com sucesso" })
                    }
                })
        })
      
    },
    async StatusCheck(req, res) {
        const { protocolo } = req.body

        pool.query('select * from ConectaContabilizar.tb_ctrl_check where status = 1 and protocolo = ?', [protocolo], (err, response) => {
            if (err) {
                res.status(500).send({ msg: "houve um erro ao recuperar os dados" })
            } else {
                if (response[0]) {

                    res.status(200).send(true)
                } else {
                    res.status(200).send(false)
                }
            }
        })
    },
    async UpdateCheck(req, res) {
        const { protocolo, tip } = req.body
        if (tip == 1) {
            pool.query('update ConectaContabilizar.tb_ctrl_check set status = 0 where protocolo = ?', [protocolo], (err) => {
                if (err) {
                    res.status(500).send({ msg: "houve um erro ao recuperar os dados" })
                } else {
                    res.status(200).send({ msg: "Checklist cancelado com sucesso" })
                }
            })
        } else if (tip == 2) {
            if(await verificaRequerido(req)){
                res.status(403).send({ msg: "Existe pergunta impedindo a conclusão do checklist" })
                return false
            }
            const funci = req.session.chave
            const { oprs } = req.body
            pool.query('insert into ConectaContabilizar.tb_ctrl_check  (protocolo,funci,data,opr,status) values (?,?,now(),?,1)', [protocolo, funci, oprs.toString()], (err, response) => {
                if (err) {
                    res.status(500).send({ msg: "houve um erro ao recuperar os dados" })
                } else {
                    res.status(200).send({ msg: "Checklist concluído com sucesso" })
                }
            })
        }

        async function verificaRequerido(req) {

            return new Promise((resolve, reject) => {
                const { protocolo, sumula, prpt } = req.body;
                const sumulaSplit = sumula.split('/')
        
                pool.query(`SELECT A.id_perg as id,B.*, C.*,D.*, E.*, F.tx_grupo, F.url, F.id_grupo, G.ordem AS grupoOrdem, H.id AS tip_dilig,H.tx_tipo,H.texto AS tx_dilig,H.impede FROM Sumula.tb_ctrl_pgta A 
                            LEFT JOIN Sumula.tb_fase B ON A.id_fase = B.id_fase 
                            LEFT JOIN Sumula.tb_itmt C ON A.id_instr = C.id_itmt
                            LEFT JOIN Sumula.tb_pgta D ON A.id_perg = D.id_pgta
                            LEFT JOIN (SELECT * FROM ConectaContabilizar.tb_rpst WHERE ativa= TRUE) AS E ON A.id_perg = E.id_pgta 
                            AND E.ano_sumula = ? AND E.id_sumula = ?  AND E.prf_sumula = ? AND E.id_fase = 2 AND E.id_itmt = 156
                            AND E.id_prpt = ? and protocolo = ? LEFT JOIN  Sumula.tb_grupo F ON A.id_grupo = F.id_grupo
                            LEFT JOIN Sumula.tb_ord_grupo G ON A.id_fase = G.id_fase AND A.id_grupo = G.id_grupo
                            LEFT JOIN Sumula.tip_diligencia H ON D.tipoDiligencia = H.id
                            WHERE C.id_itmt = 156 AND C.id_fase = 2 AND A.ativo = TRUE AND
                            D.ativa = TRUE AND A.id_grupo IN( 25 ) AND F.tip_grupo = 1  ORDER BY G.ordem, A.id_grupo,A.ordem;`, [sumulaSplit[0], sumulaSplit[2], sumulaSplit[1], prpt, protocolo], async (err, response) => {

                        for await (let f of response){
                            if(f.rqdo_true && f.rpst != "1"){
                                resolve(true)
                                return
                            }
                        }
                        resolve(false)
                })
            })
        }
    },
  
}