const mysql = require('mysql');
const os = require('os')
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const pool = require('./controller/Services/pool');
const bd = require('./controller/Services/bd');
const connectionMiddleware = require('./controller/Services/connection-middleware');
const bodyparser = require('body-parser');
const express = require('express');
const expressip = require('express-ip');
var cookieParser = require('cookie-parser');
const httpsPort = 3803;
const fs = require('fs');
const requestIp = require('request-ip');
const morgan = require('morgan');
const path = require('path');
    var session = require('express-session');
var store = new session.MemoryStore();
var expressVue = require("express-vue");
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
var key = fs.readFileSync('./ssl/key.pem', 'utf8');
var cert = fs.readFileSync('./ssl/server.crt', 'utf8');
const passport = require('passport');
const https = require('https');
const http2 = require('http2')
const helmet = require('helmet');
const uuid = require('uuid');
const cors = require('cors');
const axios = require('axios');
var MySQLStore = require('express-mysql-session')(session);
const validaToken = require('./controller/Acesso/validatoken');
const verificaToken = require('./controller/Acesso/verificaToken');
const validaAcesso = require('./controller/Acesso/validaAcesso');
const api = require('./controller/API/consulta')
const saldo = require('./controller/API/recuperaSaldo')
const sas = require('./controller/API/consultaSas')
const demanda = require('./controller/API/Demandas')
const retornaFunci = require('./controller/Control/retornaFunci');
const contaVinculada = require('./controller/Control/controleContaVinculada');
const valores = require('./controller/Control/controleValores');
const upload = require('./controller/Control/controleArquivos');
const obs = require('./controller/Control/controleObs');
const checkList = require('./controller/CheckList/controlePerguntas');
const opr = require('./controller/API/opr');
const fileUpload = require('express-fileupload');
const npj = require('./controller/API/npj');
const contaNpj = require('./controller/Control/controleContaNpj');
const Demandas = require('./controller/API/Demandas');
const getVinculoOpr = require('./controller/API/getVinculoOpr');
const rateio = require('./controller/API/consultaRateio');
const app = express();
app.use(cookieParser())
app.use(bodyparser.urlencoded({
    extended: true
}));
const corsOptions={
    credentials: true,
    origin:true
}
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyparser.json());
app.use(fileUpload());
const corsAll = function(req,res,next){

    const host = req.headers.origin
    console.log(host)
    res.setHeader('Content-Type', 'application/json;charset=utf-8')
    res.setHeader('Access-Control-Allow-Origin', host)
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    next()

}
app.use(cors(corsOptions));
// app.use(corsAll)
app.use(morgan('combined', { stream: accessLogStream }));
app.use(expressip().getIpInfoMiddleware);
var options = {
    database: 'ConectaContabilizar',
    schema: {
        tableName: 'tb_users_online',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires_column_name',
            data: 'data_column',
        }
    },
    endConnectionOnClose: true,
    expiration: 3000000,
    clearExpired: true,
    checkExpirationInterval: 900000,
}
var connection = mysql.createPool(bd.conexaoSession);
var sessionStore = new MySQLStore(options, connection);
app.use(session({
    secret: 's3Cur3',
    name: 'appContabiliza',
    resave: false,
   
    genid: function (req) {
        return uuid();
    },
    saveUninitialized: false,
    store: sessionStore,
    maxAge: 600000,
    cookie: { secure: true }
})
);
const ipMiddleware = function (req, res, next) {
    const clientIp = requestIp.getClientIp(req);
    req.session.ip = clientIp;
    next();
};

app.use(ipMiddleware);
app.disable('x-powered-by');
// app.use(connectionMiddleware(pool));
app.use(helmet());
app.use(passport.initialize());
app.use(passport.session());
var credentials = {
    key: key,
    cert: cert
};

app.get('/contabilizar',(req,res)=>{
    const param = req.query.sumula
    if(param){

      res.send(`<html><script>window.location="https://gs4935.intranet.bb.com.br/contabiliza/?sumula=${param}"</script><html>`)
    }else{
        res.send(`<html><script>window.location="https://gs4935.intranet.bb.com.br/contabiliza/"</script><html>`)
    }
})
app.get('/DetalhesSumulaFormalizador',validaToken.validaToken)
app.get('/retornoSumula',validaToken.validaToken,api.getSumulaCompleta)
app.get('/pesquisaSumula',validaToken.validaToken,api.recuperaSumula)
app.post('/complementos',validaToken.validaToken,api.recuperaComplementos)
app.post('/funcionario',retornaFunci.consultaFuncionario)
app.post('/retornaSaldo',validaToken.validaToken, saldo.recuperaSaldo)
app.post('/pesquisaDemandaProtocolo',validaToken.validaToken, demanda.consultaDemandaProtocolo)
app.post('/pesquisaDemandaMci',validaToken.validaToken, demanda.consultaDemandaMCI)
app.post('/pesquisaDemandaId',validaToken.validaToken, demanda.consultaDemandaId)
app.post('/vinculaDemandaSumula',validaToken.validaToken, demanda.vinculaDemandaSumula)
app.post('/vinculaGsvSumula',validaToken.validaToken, demanda.vinculaGsvSumula)
app.post('/retornaDemandaSumula',validaToken.validaToken, demanda.retornaProtocoloSumula)
app.post('/deleteDemandaSumula',validaToken.validaToken, demanda.updateInativaDemanda)
app.post('/pesquisaOperacoesDemanda',validaToken.validaToken, demanda.consultaOperacoesDemanda)
app.post('/retornaPerguntas',validaToken.validaToken, checkList.retornaPerguntas)
app.post('/gravarResposta',validaToken.validaToken, checkList.gravarResposta)
app.post('/adicionaConta',validaToken.validaToken, contaVinculada.adicionaConta)
app.post('/recuperaConta',validaToken.validaToken, contaVinculada.recuperaConta)
app.post('/excluiConta',validaToken.validaToken, contaVinculada.excluiConta)
app.post('/editaConta',validaToken.validaToken, contaVinculada.editaConta)
app.post('/atualizaValores',validaToken.validaToken, valores.atualizaValores)
app.post('/recuperaValores',validaToken.validaToken, valores.recuperaValores)
app.post('/updateStatus',validaToken.validaToken, valores.updateStatus)
app.post('/upload',validaToken.validaToken,upload.uploadFile)
app.post('/salvaobs',validaToken.validaToken,obs.salvaObs)
app.post('/excluiobs',validaToken.validaToken,obs.excluiObs)
app.post('/getobs',validaToken.validaToken,obs.getObs)
app.post('/consultaSas',sas.recuperaDados)
app.post('/getobs',validaToken.validaToken,upload.uploadFile)
app.post('/verificaConta',validaToken.validaToken,contaVinculada.verificaExcluido)
app.post('/checkStatus',validaToken.validaToken,checkList.StatusCheck)
app.post('/checkUpdate',validaToken.validaToken,checkList.UpdateCheck)
app.get('/download',validaToken.validaToken,upload.downloadFile)
app.get('/getFiles',validaToken.validaToken,upload.findFiles)
app.get('/getGecor',validaToken.validaToken,contaVinculada.verificaGecor)
app.post('/oprDetalhes',validaToken.validaToken,opr.oprDetails)
app.post('/getRateio',validaToken.validaToken,rateio.getRateio)
app.post('/oprEmpreendimentos',validaToken.validaToken,opr.oprDetalhes)
app.post('/oprRazao',opr.oprRazao)
app.post('/oprRazaoConfirma',opr.updateStatusRazao)
app.get('/oprRazao',opr.retornaStatusRazao)
app.post('/vinculo',validaToken.validaToken,npj.npjVinculo)
app.post('/updateRazao',validaToken.validaToken,opr.updateRazao)
app.post('/updateContaNpj',validaToken.validaToken,contaNpj.adicionaContaNpj)
app.post('/recuperaContaNpj',validaToken.validaToken,contaNpj.recuperaContaNpj)
app.post('/abrirDiligencias',validaToken.validaToken,Demandas.abrirDiligenciaRepasse,Demandas.gerarRepasse)
app.post('/getDiligencias',(validaToken.validaToken,Demandas.retornaDiligenciasNpj))
app.post('/getVinculoOpr',(validaToken.validaToken,getVinculoOpr.vinculo))
app.post('/oprDados',(validaToken.validaToken,opr.oprDados))

app.get('/login',(req,res)=>{
    res.setHeader('Content-Type', 'application/json;charset=utf-8')
     res.setHeader('Access-Control-Allow-Origin', 'https://localhost.bb.com.br:3804',)
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.status(301).send('login')
    // res.redirect("https://login.intranet.bb.com.br/sso/XUI/#login/&goto=https://gs4935.intranet.bb.com.br/contabiliza")
})
// app.get('/validaToken',validaToken.validaLogin)
app.get('/validaToken',verificaToken.filtroLogin,validaToken.validaLogin)
if (os.type() == "Windows_NT") {
    var httpsServer = https.createServer(credentials, app);
    httpsServer.listen(httpsPort, () => {
        console.log("Https server listing on port : " + httpsPort);
    });
} else {
    if (cluster.isMaster) {
        console.log('Master process is running');
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }
    } else {
        var httpsServer = https.createServer(credentials, app);
        httpsServer.listen(httpsPort, () => {
            console.log("Https server listing on port : " + httpsPort);
        });
    }
}
