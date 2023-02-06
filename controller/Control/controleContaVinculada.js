const pool = require('../Services/pool')

module.exports = {

    async adicionaConta(req,res){
        try{

            const {conta,agencia,protocolo,sumula} = req.body;
            const sumulaSplit = sumula.split('/')
            const funci = req.session.chave
            if(!conta||!agencia||!protocolo||!sumula){
                res.status(401).send({msg:"Ausência de informação, não foi possível salvar a conta vinculada"})
                return false
            }
        pool.query('select * from ConectaContabilizar.conta_vinculada where protocolo = ? and agencia = ? and conta = ?',[protocolo,agencia,conta],(erro,resposta)=>{
            if(resposta[0]){
                res.status(401).send({msg:"Conta já acadastrada para essa súmula/protocolo"})
                return false
            }
            pool.query('insert into ConectaContabilizar.conta_vinculada (protocolo,ano_sumula,prf_sumula,nr_sumula,agencia,conta,funci,data) values (?,?,?,?,?,?,?,now())',
            [protocolo,sumulaSplit[0],sumulaSplit[1],sumulaSplit[2],agencia,conta,funci],(err,response)=>{
                if(err){
                    console.log(err)
                    res.status(500).send({msg:"houve um erro, por favor tente novamente"})
                }else{
                    console.log(response)
                    res.status(200).send({msg:"Conta adicionada com sucesso"})
                }
            })
        })
    }catch(error){
        res.status(403).send({msg:"houve um erro, por favor tente novamente"})
    }
    },
    async recuperaConta(req,res){

        const {protocolo,sumula} = req.body;
        const sumulaSplit = sumula ? sumula.split('/') : protocolo.split('/')

        pool.query('select A.* from ConectaContabilizar.conta_vinculada A where A.protocolo = ? and  A.ano_sumula= ? and  A.prf_sumula = ? and  A.nr_sumula = ? ',
        [protocolo,sumulaSplit[0],sumulaSplit[1],sumulaSplit[2]],(err,response)=>{
            if(err){
                console.log(err)
                res.status(500).send({msg:"houve um erro, por favor tente novamente"})
            }else{
                res.status(200).send(response)
            }
        })
    },
    async excluiConta(req,res){

        const {id} = req.body;
        pool.query("select *  from ConectaContabilizar.conta_vinculada where id  = ?",[id],(error,resposta)=>{
            if(resposta[0]){
                const {agencia,conta,protocolo, ano_sumula, prf_sumula, nr_sumula} =resposta[0];
                pool.query('insert into ConectaContabilizar.tb_conta_excluida (protocolo,agencia,conta,funci,data, ano_sumula, prf_sumula, nr_sumula) values(?,?,?,?,now(),?,?,?)',[protocolo,agencia,conta,req.session.chave, ano_sumula, prf_sumula, nr_sumula],(errInsert, respInsert)=>{
                    if(errInsert){
                        console.log(errInsert)
                    }
                });  
            }
                pool.query('delete from ConectaContabilizar.conta_vinculada where id  = ?',
                [id],(err,response)=>{
                    console.log(response)
                    if(err){
                        console.log(err);
                        res.status(500).send({msg:"houve um erro, por favor tente novamente"});
                    }else{
                        res.status(200).send(response);
                    }
                })
            })
    },
    async verificaExcluiConta(req,res){

        const {conta,agencia,protocolo,sumula} = req.body;
        const sumulaSplit = sumula.split('/')

        pool.query('delete from ConectaContabilizar.conta_vinculada where agencia = ? and conta  = ? and (protocolo = ? or ano_sumula = ? and prf_sumula = ? and nr_sumula = ?)',
        [conta,agencia,protocolo,sumulaSplit[0],sumulaSplit[1],sumulaSplit[2]],(err,response)=>{
            if(err){
                console.log(err)
                res.status(500).send({msg:"houve um erro, por favor tente novamente"})
            }else{
                res.status(200).send(response)

            }
        })
    }, async editaConta(req,res){

        const {conta,agencia,id} = req.body;
        const funci = req.session.chave

        pool.query('update ConectaContabilizar.conta_vinculada set agencia = ?,  conta  = ?, funci = ? , data = now() where id = ?',
        [agencia,conta,funci,id],(err,response)=>{
            if(err){
                console.log(err)
                res.status(500).send({msg:"houve um erro, por favor tente novamente"})
            }else{
                res.status(200).send(response)
            }
        })
    },
    async verificaExcluido (req,res){

        const {protocolo,demandas} = req.body;
        const sumulaSplit =protocolo.split('/')

        pool.query('select * from ConectaContabilizar.tb_conta_excluida where protocolo =? and ano_sumula = ? and prf_sumula =? and nr_sumula = ?',[demandas, sumulaSplit[0],sumulaSplit[1],sumulaSplit[2]],(err,response)=>{
            if(err){
                console.log(err)
                res.status(500).send({msg:"houve um erro, por favor tente novamente"})
            }else{
                res.status(200).send(response)

            }
        })
    },
    async verificaGecor (req,res){

        pool.query('select * from ConectaContabilizar.tb_gecor',(err,response)=>{
            if(err){
                console.log(err)
                res.status(500).send({msg:"houve um erro, por favor tente novamente"})
            }else{
                res.status(200).send(response)
            }
        })
    }
}