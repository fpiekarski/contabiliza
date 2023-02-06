module.exports = pool => (req, res, next) => {
  
pool.getConnection((err, connection) => {
    if(err) return next(err);
    console.log('pool => obteve conexão');
    // adicionou a conexão na requisição
    req.connection = connection;
    // passa a requisição o próximo middleware
    req.requisicao = 
    next();
    // devolve a conexão para o pool no final da resposta
    res.on('finish', () => req.connection.release());
    res.on('send', () => req.connection.release());
    res.on('render', () => req.connection.release());
});

};




// pool.getConnection((err, connection) => {
//     if(err) return next(err);
//     console.log('pool => obteve conexão');
//     // adicionou a conexão na requisição
//     req.connection = connection;
//     // passa a requisição o próximo middleware
//     req.requisicao = 
//     next();
//     // devolve a conexão para o pool no final da resposta
//     res.on('finish', () => req.connection.release());
// });