<template>
<div>
 <a class="waves-effect waves-light btn modal-trigger hide" ref="modal" href="#modalEdit"></a>


  <!-- Modal Structure -->
  <div id="modalEdit" class="modal modal-fixed-footer">
    <div class="modal-content">
      <h4>Confirma Edição da Conta</h4>
      
    </div>
    <div class="modal-footer">
      <a class="modal-close waves-effect waves-green btn-flat" v-on:click="confirmaConta()">Sim</a>
      <a  class="modal-close waves-effect waves-green btn-flat" v-on:click="cancelaConfirmaConta()">Não</a>
    </div>
  </div>
 

    <div class="row  center border-dotted" >
        <div class="col s8">

        <div class="col s12 " ref="idConta" :data-id="id">
        <div class="col row s12 center  text-blue-grey text-darken-3">
<form>
        <div class="input-field col s6" >
          <input :id=agencia+alias  type="number" disabled=true onKeyPress="console.log(this.value); if(this.value.length == 4 ) return false;"  maxlength="4" v-on:keyup="validaValor(1)" :value=agencia  ref="agencia" class=" agencia" >
          <label class="active" :for=agencia+alias >Prefixo</label>
        </div>
        <div class="input-field col s6">
          <input   :value=conta :id=alias+conta disabled=true v-on:keyup="validaValor(0)" ref="conta" type="number" pattern="/^-?\d+\.?\d*$/" class="conta" >
          <label class="active" :for=alias+conta >Conta Vinculada</label>
        </div>
</form>
        </div>
        </div>
    <div class="col s12 center">

         <div class="input-field offset-s2 col s7">
             <span>Saldo Conta Vinculada (a):</span>
          <input readonly  ref="saldo" type="text" class="validate saldo">
        </div>
         <div class="col s1" style="margin-top:2em" >

        <a><i class="material-icons tooltipped " ref="atualizaSaldo" v-on:click="atualizaSaldo('')" data-tooltip="Consultar Saldo da Conta">refresh</i></a>
         </div>
    </div>
        </div>
        <div class="row col s4" style="color:#039be5">
            <!-- <div class="row col s12">

            <a ><i class="material-icons">edit</i>Editar conta vinculada</a>
            </div> -->
            <!-- <i class="material-icons">edit</i>
              <span>Editar Conta Vinculada</span>
            <div class="switch" >
              <label>
                Não
                <input type="checkbox" ref="switch" v-on:change="editarConta">
                <span class="lever"></span>
                Sim
              </label>
            </div> -->
           
             <div class="row col s12" style="margin-top:2em">
            <a v-on:click="excluiConta()"><i class="material-icons ">delete</i>Excluir conta vinculada</a>
            </div>
            <div class="row col s12">Titulo Razão: <span  ref="titulo"></span></div>
        </div>
    </div>
</div>
</template>
<script>
  import M from "materialize-css";
import Pesquisa from "../services/pesquisa";


export default {
  async  mounted() {
    // M.AutoInit();
    if(this.conta !=""){
       this.atualizaSaldo()
    }
  }, methods: {
    atualizaSaldo: async function () {
     const conta = this.$refs.conta.value
     const agencia =  this.$refs.agencia.value
     const saldo = await Pesquisa.retornaSaldo(conta,agencia)
     if(saldo.data.data.data.retorno.codigo == 9){
      const id = this.$refs.idConta.dataset.id
      this.$emit("inexistente",id);
     }
     const valor = saldo.data.data.data.dados.valorSaldoContaCorrente.toLocaleString('pt-br',
     {style: 'currency', currency: 'BRL'});
     var tituloRazao = saldo.data.tituloRazao
     this.$refs.saldo.value = valor
     if(!tituloRazao){
       if(!this.open){
         this.$emit("sas",this)
          
       }else{

         
         M.toast({html: 'Atenção, a pesquisa pode demorar alguns segundos, por favor aguarde'})
        this.$refs.atualizaSaldo.classList.add('ball')
        const h = await Pesquisa.consultaSas(conta,agencia,this.user,this.pwd);
        console.log(h)
        if(h.data.status == "500"){
          M.toast({html: h.data.erro,displayLength:5000})
           M.toast({html: "Atenção, verifique seu acesso ou sua senha para consultar o serviço SAS",displayLength:10000})
           console.log(h.data.erro)
        }
        this.$refs.atualizaSaldo.classList.remove('ball')
        tituloRazao = h.data.data[0].RAZAO
          }
     }
     console.log(tituloRazao)
     this.$refs.titulo.innerText = tituloRazao
     console.log("valor va")
     this.$emit("valor",{conta,agencia, valor:saldo.data.data.data.dados.valorSaldoContaCorrente,tituloRazao});
    },
    
 
  recuperaContas(){
    
      console.log("recupera")
    
  },excluiConta(){
    const id = this.$refs.idConta.dataset.id
    
    this.$emit("exclui",id);
  },
  validaValor(e){
    if(e){
      const agencia =  this.$refs.agencia.value
      console.log(agencia)
    }else{
      const conta = this.$refs.conta.value
      console.log(conta)
    }
  },
  editarConta(){
    
      const s =  this.$refs.switch.checked
      var elems = document.querySelectorAll('.modal');
      M.Modal.init(elems);
      if(!s){
        this.$refs.conta.disabled = true
        this.$refs.agencia.disabled = true
        this.$refs.modal.click()
      }else{
       
        this.$refs.conta.disabled = false
        this.$refs.agencia.disabled = false   
       }
  },
  confirmaConta(){
     const conta = this.$refs.conta.value
     const agencia = this.$refs.agencia.value
     const id = this.$refs.idConta.dataset.id
     if(conta !="" && agencia !=""&& conta !=null && agencia !=null){
        const confirma = true
        if(confirma){
          this.$emit("editar",{conta,agencia, id})
       }
     }
  },
    cancelaConfirmaConta(){

    }
  
   },
   props:{
      conta: String,
      agencia: String,
      alias: String,
      id:String,
       pwd:{type:[String,Function,Object],default:""},
      user:{type:[String,Function,Object],default:""},
      open:Boolean
   }
}
</script>


<style>
#modalEdit{
  height: 25%!important;
  width: 40%!important;
}
.ball {
  animation: 2s move infinite;
}

@keyframes move {
 0% {
    transform:rotate(90deg)
  }
 25% {
    transform:rotate(180deg)
  }
   50% {
    transform:rotate(270deg)
  }
   75% {
    transform:rotate(360deg)
  }
  100%{
    transform:rotate(0deg)

  }
}
</style>