const pool = require('../Services/pool')

module.exports = {


    async  verificaStatusCheck(protocolo) {
        return new Promise((resolve, reject) => {
            pool.query('select * from ConectaContabilizar.tb_ctrl_check where status = 1 and protocolo = ?', [protocolo], (err, response) => {
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