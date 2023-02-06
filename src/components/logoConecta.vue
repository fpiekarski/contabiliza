<template>
   <div class="box-logo col s5 " id="caixa-logo-app">
  <div class="col s3">
    <div class="card box-titulo">
      <div class="card-content white-text">
        <div class="row logo-bb">
          <img src="https://gserv4935.intranet.bb.com.br/Conecta/imagens/CONECTA.png" />
        </div>
      </div>
    </div>
  </div>
   </div>
</template>

<script>
// import M from 'materialize-css'
export default {
  name: "LogoConecta",
  props: {
    msg: String,
    endereco:String
  },
  mounted () {
    // M.AutoInit()
},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.box {
}
.logo-bb {
    text-align: center;
}

.box-titulo {
    border: none;
    border-width: 1px;
    border-color: #0e7594;
    background: linear-gradient(50deg, rgb(19, 98, 145) 10%, rgb(6, 65, 75) 120%);
    min-width: 190px;
}
.box-logo {
    position: absolute;
    margin-left: 5em;
    margin-top: 5%;
    transform: translatey(-45%) translateX(-20%);
}

#caixa-logo-app {
    position: absolute;
    margin-top: 0%;
}

ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
