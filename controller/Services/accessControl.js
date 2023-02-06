const pool = require('./pool')
const routes = require('../Routes/RouterFilters')

module.exports = {


    async verificaAcesso(req, res, next) {
        var retorno = false;
        try {
            const chave = req.session.chave
            //const chave = 'f3163735'
            const path = req.route.path
            const acesso = req.session.acesso
            pool.query('select * from Sumula.TB_ACESSO where chave_funci = ?', [chave], (err, response) => {
                const access = response[0].PAPEL

                const acessos = access.split(";")

                if (acessos.find(i => (i == acesso))) {
                    retorno = true;
                    next()
                } else {
                    res.format({
                        html: function () {

                            res.status(401).render('paginas/erro400', { lista: acesso, funci:chave, pagina: path  });
                        }
                    })
                    return false;
                }
            })
        } catch (erro) {
            console.log(erro)
        }
    },
    async verificaNameAcesso(req, res, next) {
        const path = req.route.path
        const name = routes.acessos.find(o => (o.name == path))
        console.log(path)
        req.session.acesso = name.acesso
        next()
    }
}