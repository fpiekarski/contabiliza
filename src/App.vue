<template>
  <div id="app" v-if="!selecionado">
    <title>Contabilizar</title>
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <LogoConecta :endereco="enderecoImg"/>
    <BoxPesquisa :selecionado="selecionado" v-on:seleciona="changeState"   />
  <iframe class="hide" src="https://gs4935.intranet.bb.com.br:3803" frameborder="0"></iframe>
  <!-- <a ref="login" href="https://intranet.bb.com.br">teste</a> -->
  </div>

  <div v-else>
    <contabiliza :funci="this.funci" :sumula="this.sumula" :sumulaStatus="this.sumulaStatus"/>
  </div>
</template>

<script>
import LogoConecta from "./components/logoConecta.vue";
import BoxPesquisa from "./components/boxPesquisa.vue";
import contabiliza from "./components/contabiliza.vue";
import Pesquisa from "./services/pesquisa";
export default {
  name: "App",
  components: {
    LogoConecta,
    BoxPesquisa,
    contabiliza,
  },
  data(){
    return{
      endereco:"",
      selecionado : false,
      enderecoImg: "",
      funci:""
    }
  },
  methods: {
    controller: function () {
      console.log("esse");
    },
    changeState: async function(a){
      console.log("change",a.sumulaCompleta)
      this.sumula = a.sumulaCompleta
      console.log(a)
      this.sumulaStatus= a.statusSumula
      await this.verificaStatus()
      this.selecionado = true;
    },
     verificaStatus:async function(){
       const status = await Pesquisa.verificaToken()
         const localAdress = window.location.href.toString()
         const url = localAdress.replace("#","").split("//")
         console.log(url)
       if (status.data.status == false) {
               window.location.href ="https://login.intranet.bb.com.br/sso/XUI/#login/&goto=https://"+url
              // this.$refs.login.click()
        }else{
          this.funci == status.data.funci
          console.log("funci1",this.funci)
          console.log("funci1",this.funci)
          console.log( status.data)
        }
         const url1 = url[1].split(":")
         this.endereco = "https://"+url1[0] +":3803"
         this.enderecoImg ="https://"+url[1]+"assets/CONECTA.png"
  }
  },
  beforeCreate: async function(){
   const status = await Pesquisa.verificaToken()
   console.log("status",status)
         const localAdress = window.location.href.toString()
         const url = localAdress.replace("#","").split("//")
         console.log('before')
       if (status.data.status == false) {
               window.location.href ="https://login.intranet.bb.com.br/sso/XUI/#login/&goto=https://"+url
              // this.$refs.login.click()
        }else{
          this.funci == status.data.funci
           console.log( status.data.funci)
             console.log(this)
        }
         const url1 = url[1].split(":")
         this.endereco = "https://"+url1[0] +":3803"
         this.enderecoImg ="https://"+url[1]+"assets/CONECTA.png"
  }
  // await this.verificaStatus()
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #eef1f5;
  margin-top: 60px;
  background: linear-gradient(
    to left,
    rgb(3, 53, 82) 100%,
    rgb(6, 81, 100) 100%
  );
  height: 100%;
}
body {

    background: linear-gradient(
    to left,
    rgb(3, 53, 82) 100%,
    rgb(6, 81, 100) 100%
  );
}
</style>