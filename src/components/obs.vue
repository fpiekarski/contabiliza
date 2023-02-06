<template>
<div>
  <a class="waves-effect waves-light btn modal-trigger" href="#modal_obs">Observações</a>

  <div class="modal" id="modal_obs" style="width:80%">
      <div class="row modal-content" >
        <div class="input-field col s11">
          <textarea id="textarea1" ref="obs" class="materialize-textarea"></textarea>
          <label for="textarea1">Observações</label>
        </div>
        <a class="waves-effect waves-light btn" v-on:click="salvaObs"><i class="material-icons">save</i>Salvar</a>
          <div class="card grey darken-3 " v-for="t in obs" :key="t.id"  style="border:1px dotted grey, margin-top:2px">
          <div class="card-content white-text">
          <span class="grey darken-4 ">{{t.funci}} -{{t.data}} </span>
          <p class="">{{t.tx_obs}}</p>
        </div>
        <div class="card-action">
          <i :id="t.id" class="material-icons tooltipped pointer white-text" v-on:click="excluir" data-tooltip="Clique para excluir essa anotação">delete</i>
        </div>
      </div>
          
          </div>
      </div>
      </div>
</template>

<script>
import Pesquisa from "../services/pesquisa";
import M from "materialize-css";
export default {
    async mounted(){
         await this.getObs();
            M.AutoInit();
    },
     props:{
        protocolo: String,
    },
     data() {
    return {
        obs: []
    }
    },watch:{
      obs:function(){
       var elems = document.querySelectorAll('.tooltipped');
       M.Tooltip.init(elems);
  
      }
    },
     methods:{
     salvaObs:async function(){
         const tx = this.$refs.obs.value;
         const id = this.protocolo;
         
         await Pesquisa.salvaObservacoes(tx,id)
         this.getObs()
         this.$refs.obs.value = ""

     },
     getObs: async function(){
         const id = this.protocolo;
         const r = await Pesquisa.getObservacoes(id)
        //  this.$refs.obs.value = r.tx_obs
        this.obs = []
        for (let g of r.data){
          const d =  new Date(g.data).toLocaleTimeString('pt-br')
          const t =  new Date(g.data).toLocaleDateString('pt-br')
          this.obs.push({data:t+"-"+d,funci:g.funci,tx_obs:g.tx_obs, id:g.id})
        }
   
        // this.obs = r.data
          // M.AutoInit();
     },
     excluir: async function(o){
       const id= o.target.id
         await Pesquisa.excluiObservacoes(id)
        await this.getObs()  
        const r = document.getElementsByClassName('material-tooltip')
        for (o of r){

           o.style.display = "none"
        }
        
     },
      erroObs: function(e, t) {
          var fechar = "</span><a class='btn-flat toast-action amber-text accent-2-text' onclick='fecharToast()'>Fechar</a>"
           M.toast({ html: e + fechar, classes: t, displayLength: 3000, activationPercent: 0.5 });
      }
     
 }
}
</script>
<style >

</style>