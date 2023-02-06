<template>
<div class="col row s12">

  <div class="col s12" style="border:1px dotted grey">
    <input type="file" name="file"  ref="files" />
    <a class="btn right" @click="sendFile"><i class="material-icons">save</i>enviar</a>
  </div>
  <div class="col s12" style="margin-top:2em; border: 1px dotted grey">
    <span>Arquivos Salvos</span>
    <ol>
     <li v-for="t in arrayFiles" :id="t.id" :key="t.id" class="pointer" style="margin-top:6px" v-on:click="baixarArquivo"><span class="col s6">{{t.name}} </span>| {{t.funci}} | {{t.dataHora}}</li>
     </ol>
  </div>
</div>
</template>

<script>
 import Pesquisa from "../services/pesquisa";

export default {
  props:{
    sumula:String
  },
  mounted(){
 
    
    this.getFiles()
 

  }, data() {
    return {
      arrayFiles:[]
    }
  },
  methods: {
    async sendFile() {
      let dataForm = new FormData();
      for (let file of this.$refs.files.files) {
        dataForm.append(`file`, file);
      }
   await fetch(`https://gs4935.intranet.bb.com.br:3803/upload`, {
          method: 'POST',
          body: dataForm,
          credentials:'include'
        });
        // let data = await res.json();
        const r = await this.getFiles()
        this.arrayFiles = r.data
  },
  async baixarArquivo(a){
    const id = a.target.parentElement.getAttribute('id')
    await Pesquisa.download(id)
  },
  async getFiles(){
     this.arrayFiles = []
      const files = await Pesquisa.getFile(this.sumula)
     for await (let f of files){
      const d =  new Date(f.data).toLocaleTimeString('pt-br')
      const h =  new Date(f.data).toLocaleDateString('pt-br')
      f.dataHora =h+"-"+d
      this.arrayFiles.push(f)
    }
  }
}
}
</script>
<style scoped>
.pointer{
  cursor:pointer
}
li:hover{
  color:blue
}
</style>