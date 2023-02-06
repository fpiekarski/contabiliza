const pool = require('../Services/pool')

module.exports = {

    async atualizaValores(req,res){
        const {valor,numUnico,protocolo,  demandas} = req.body;
        var vr = req.body.valor
        if(vr == null){
            vr = 0
        }
        const honorarios =parseFloat(valor.honorarios).toFixed(2)
        const custas = parseFloat(valor.custas).toFixed(2)
        const acordo = parseFloat(valor.acordo).toFixed(2)
        if(! req.body.npj){
            var npj = ""
        }else{
            var npj =  req.body.npj
        }
        pool.query('select * from ConectaContabilizar.vl_oprs where numUnico = ? and protocolo = ? and demandas = ?',[numUnico, protocolo, demandas],(error,response)=>{
       
            if(response.length > 0){
                pool.query('update ConectaContabilizar.vl_oprs set acordo = ?, honorarios= ?, custas = ? where numUnico = ? and demandas = ?',[acordo,honorarios,custas,numUnico, demandas],(error1,response1)=>{
                    if(error1){
                        console.log(error1)
                        res.status(500).send({msg:"houve um erro, por favor tente novamente"})
                    }else{
                        res.status(200).send({msg:`valores atualizados com sucesso`})
                    }
                })
            }else{
            
                pool.query('insert into ConectaContabilizar.vl_oprs (numUnico,honorarios,custas, protocolo,acordo, npj, demandas) values(?,?,?,?,?, ?,?)',
                [numUnico,honorarios,custas,protocolo,acordo,npj, demandas],(err,response1)=>{
                    if(err){
                        console.log(err)
                        res.status(500).send({msg:"houve um erro, por favor tente novamente"})
                    }else{
                        console.log(response1)
                        res.status(200).send({msg:"Conta adicionada com sucesso"})
                    }
                })
            }
        })
    },
    async recuperaValores(req,res){

        const {numUnico,protocolo,demandas} = req.body;
        pool.query('select * from ConectaContabilizar.vl_oprs where numUnico = ? and protocolo = ? and demandas = ?',
        [numUnico,protocolo, demandas],(err,response)=>{
            if(err){
                console.log(err)
                res.status(500).send({msg:"houve um erro, por favor tente novamente"})
            }else{
                    //  response[0].acordo= response[0].acordo ? response[0].acordo.toFixed(2):"0,00"
                    //  response[0].custas= response[0].custas ? response[0].custas.toFixed(2):"0,00"
                    //  response[0].honorarios= response[0].honorarios ? response[0].honorarios.toFixed(2):"0,00"
                    const host = req.headers.origin
                    // res.setHeader('Content-Type', 'application/json;charset=utf-8')
                    // res.setHeader('Access-Control-Allow-Origin', host)
                    // res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
                    // res.setHeader('Access-Control-Allow-Credentials', 'true')
                    if(response[0] && response[0].status == null){
                        response[0].status = true
                    }
                res.status(200).send(response)
            }
        })
    },
    async updateStatus(req,res){

        const {tipo,numUnico,protocolo, status, demandas} = req.body;
        const valor = req.body.status
        console.log("teste")
        console.log(req.body)
        pool.query('select * from ConectaContabilizar.vl_oprs where numUnico = ? and protocolo = ? and demandas = ?',[numUnico, protocolo, demandas],(error,response)=>{
            if(response.length > 0){
                pool.query('update ConectaContabilizar.vl_oprs set status = ? where numUnico = ? and demandas = ? and protocolo = ?',[valor,numUnico, demandas, protocolo],(error1,response1)=>{
                    if(error1){
                        console.log(error1)
                        res.status(500).send({msg:"houve um erro, por favor tente novamente"})
                    }else{
                        res.status(200).send({msg:`Status atualizado com sucesso`})
                    }
                })
            }else{
                const {honorarios,custas,acordo, demandas} = req.body
                pool.query('insert into ConectaContabilizar.vl_oprs (numUnico,honorarios,custas, protocolo,acordo, status, demandas) values(?,?,?,?,?,?,?)',
                [numUnico,0,0,protocolo, 0, status, demandas],(err,response1)=>{
                    if(err){
                        console.log(err)
                        res.status(500).send({msg:"houve um erro, por favor tente novamente"})
                    }else{
                        console.log(response1)
                        res.status(200).send({msg:"Status atualizado com sucesso"})
                    }
                })
            }
        })
    },
}