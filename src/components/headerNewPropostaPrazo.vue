<template>
  <div ref="linha" class="row" style="border:solid 1px dotted grey;margin-bottom:5px  " v-bind:class="{ 'row col s12 light-blue darken-2': t.A, 'row col s12 light-blue darken-1': t.B }">
  <div class="row col s12" v-show="fechado">
    <div class=" col s12"  style="margin-left:-1%"><i class="material-icons white-text tooltipped" data-tooltip="clique para abrir" @click="alterna">add</i>
    <span class="white-text open" @click="alterna">Esta operação foi englobada em um novo número único, clique para detalhar</span>
    </div>
  </div>
  <div v-show="!fechado">
        
        <div class="col"> <i class="material-icons tooltipped white-text" data-tooltip="clique para fechar" @click="alterna">remove </i></div>
    <div class="row col" style="margin-bottom:1px" >
 


    <div class="vl">

    </div>
    </div>
    <div class="row col s11 " style="border-top:1px dotted grey">

    <div class="col s3 white-text  border-prop"  style="margin-top:7px " >
     Novo Numero Único
          <br />  
    </div>
    <div class="col s2 white-text border-prop" style="width:50px">Pref.</div>
    <div class="col s2 white-text border-prop" style="">Status</div>
    <div class="col s3 white-text border-prop" style="">Linha Crédito</div>
    <div class="col s2 white-text border-prop-l" style="">Valor Operação</div>
    </div>
    <div class="row col s11"  style=" margin-top: -10px; margin-left: 8.0%;">
    <div class="col s3 white-text  border-prop">
        
       <input class="white-text tooltipped col s8 icon_hide" data-tooltip="clique para copiar" readonly   @mouseover="showCopy"  @mouseout="hideCopy" ref="numUnico"  @click="copiarNumUnico" :value="t.vinculado">
        <i class="material-icons  hide"  ref="copy" style="position:absolute;">content_copy</i><br>
    </div>

    <div class="col s2 white-text border-prop" style="width:50px">{{ n.codigoPrefixoDeposito}} </div>
    <div class="col s2 white-text border-prop" >
          {{n.textoEstadoObjetoNegocio}}
        </div>

      <div class="col s3 white-text border-prop">
          {{n.nomeLinhaCredito}}
        </div>
           <div class="col s2 white-text border-prop-l">
          {{valor}}
        </div>
      </div>
      </div>
  </div>
  
</template>
<script>
import Pesquisa from "../services/pesquisa";
import M from "materialize-css";
export default {
  props: {
    t:Object,
    k:String,
    color:Object
    
  }, data() {
      return {
           n:{},
           fechado:false,
           valor:0
      }
  },
  computed(){
    return{
    }
  },
    async mounted() {
    const o = await Pesquisa.getDadosOpr(this.t.vinculado.trim())
    const y = await Pesquisa.getDetalhesOpr(this.t.vinculado.trim())
    console.log("pesquisa dados",o)
    console.log("pesquisa dados",o.data.statusCode)
    if(o.data.statusCode == 200){
      this.n = o.data.data
      this.n.detalhes = y.data.data.data
      this.valor = this.n.detalhes.listarOcorrencia[0].valorSubcontratoOperacao.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
    }
    },
    async created(){
    },
    watch:{
      t:function(){
      },
      k:function(){
      },
    },
    methods:{
    copiarNumUnico: async function(){
    try{

      let y = this.$refs.numUnico;
      y.select();
      document.execCommand('copy');
      M.toast({ html:"Texto Copiado com sucesso"})
      }catch(err){
      //console.log(err);
      M.toast({ html:"Erro ao copiar"});
    }
  },
showCopy: function(){
  this.$refs.copy.classList.remove('hide')
},
hideCopy: function(){
this.$refs.copy.classList.add('hide')
}, 
alterna: function(){
  this.fechado = !this.fechado
}
    },
};
</script>
<style>
.lineProposta {
  border-bottom: 1px solid white;
}
.border-prop{
border-left: 1px solid white;
min-height: 40px!important;
height: 100%!important;
}
.border-prop-l{
border-left: 1px solid white;
border-right: 1px solid white;

min-height: 40px!important;
height: 100%!important;
}
a.link{
  color:white!important
}
div.icon_hide > i{
  display:none
}
.icon_hide{
  cursor: pointer;
  margin-right: 0!important;
  padding: 0!important;
}
.vl {
  border-left: 6px solid rgb(47, 8, 189);
  height: 50px;
  border-bottom: 6px solid rgb(47, 8, 189);
  width: 50px;
}
i:hover{
  cursor: pointer;
}
.open:hover{
  cursor: pointer;
}
</style>
