const pool = require('../Services/pool')

module.exports = {

    async getProtocolosConducao(req,res){
        const id = req.body.id
        pool.query('select * from  ConectaContabilizar.obs_contabiliza  where protocolo = ? and ativo = 1',[id],(err, response)=>{
            if(err){
                console.log("erro")
                res.status('500').send('error')

            }else{
                res.status('200').send(response)
            }
        })
    },


}