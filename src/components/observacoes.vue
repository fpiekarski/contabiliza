<template>
<div class="col s12 row">

    <textarea type="text" ref="obs123">
</div>
</template>

<script>
// import Pesquisa from "../services/pesquisa";
export default {
    props:{
        protocolo: String
    },
//  methods:{
//      salvaObs: function(){
//          const tx = this.$refs.obs.value;
//          const id = this.protocolo;
         
//          const r = await Pesquisa.salvaObservacoes(tx,id)
//          console.log(r)
//      },
//      getObs: function(){
//          const id = this.protocolo;
//          const r = await Pesquisa.getObservacoes(id)
//          this.$refs.obs.value = r[0].tx_obs
//      }
//  }
}
</script>
