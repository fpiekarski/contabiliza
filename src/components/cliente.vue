<template>
    <div class="col s12 blue lighten-4  grey-text text-darken-4" style="margin-bottom:2px; margin-left:0px;margin-right:0px">
    <div class="col s1">
	<a :href="`https://gserv4935.intranet.bb.com.br/Deoc/?mci=${c.codigoCliente}`"  target="_blank">
	<i class="material-icons black-text tooltipped" data-tooltip="Dossiê de Operações do Cliente">folder_shared</i>
    </a>
    </div>
     <div class="col s12">Cliente:<strong><span>{{c.nomeCliente}}</span></strong></div>
     <div class=" col s12">
         <div class="col " style="padding: 0 1em 0 0;">MCI:</div>
         <div class="col s3" style="    padding: 5px 0px 0px 0px;">
     <input class="black-text tooltipped col s12 icon_hide" data-tooltip="clique para copiar" readonly   @mouseover="showCopy"  @mouseout="hideCopy" ref="nome"  @click="copiarNumUnico" 
     :value="c.codigoCliente" style="height: 1em;"> 
     <i class="material-icons  hide"  ref="copy" style="position:absolute;">content_copy</i><br/></div>
     <!-- <div class="col s12">MCI:<strong><span>{{c.codigoCliente}}</span></strong></div> -->
     </div>
     <div class="col s12">CPF/CNPJ:<strong><span>{{c.numeroCpfCadastroNacPessoasJuridicasCliente}}</span></strong></div>
    </div>
</template>

<script>
import M from "materialize-css";
export default {
    props:{
        c: {}

    }, mounted() {
    // M.AutoInit();
     var tool = document.querySelectorAll('.tooltipped');
          M.Tooltip.init(tool)
  },methods:{
        copiarNumUnico: async function(){
      try{
        let y = this.$refs.nome;
        y.select();
        document.execCommand('copy');
        M.toast({ html:"Texto Copiado com sucesso"})
        }catch(err){
        console.log(err);
        M.toast({ html:"Erro ao copiar"});
      }
    },
    showCopy: function(){
        console.log('over')
        this.$refs.copy.classList.remove('hide')
  },
    hideCopy: function(){
        this.$refs.copy.classList.add('hide')
    }
  }
}
</script>

<style scoped>
input{
    outline: none!important;
    -webkit-box-shadow: none!important;
    box-shadow: none!important;
    border-bottom:0!important;
}
</style>