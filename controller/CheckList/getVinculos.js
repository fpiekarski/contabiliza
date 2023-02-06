const pool = require('../Services/pool')

module.exports = {


    async  verificaVinculosDemandas(res,id, ano,prf,nr) {
        return new Promise((resolve, reject) => {
            pool.query('select * from ConectaContabilizar.vinc_demandas where status = 1 and demandas = ? AND ano_sumula = ? AND nr_sumula = ? AND prf_sumula = ?', [id, ano, nr, prf], (err, response) => {
                if (err) {
                    res.status(500).send({ msg: "houve um erro ao recuperar os dados" })
                }
                if (response.length > 0) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            })
        })
    },
    async  verificaVinculosGsv(res,id, ano,prf,nr) {
        return new Promise((resolve, reject) => {
            pool.query('select * from ConectaContabilizar.vinc_demandas where status = 1 and protocolo = ? AND ano_sumula = ? AND nr_sumula = ? AND prf_sumula = ?', [id, ano, nr, prf], (err, response) => {
                if (err) {
                    res.status(500).send({ msg: "houve um erro ao recuperar os dados" })
                }
                if (response.length > 0) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            })
        })
    }


}