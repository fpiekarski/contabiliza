const fs = require("fs")
module.exports = {
  publicPath:process.env.NODE_ENV === 'production'  ? 'https://gs4935.intranet.bb.com.br/contabiliza':"/",
  devServer: {
    https: true,
    cert: fs.readFileSync('./ssl/server.crt', 'utf8'),
    key: fs.readFileSync('./ssl/key.pem', 'utf8'),
    host: 'localhost.bb.com.br',
    port: 3804,
    headers: {
      'Access-Control-Allow-Origin': '*.bb.com.br',
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE"
    },
  },

  transpileDependencies: [
    'vuetify'
  ]
}
