<template>
  <div v-bind:class="{ 'row col s12 border-dotted-red center ': impede,'row col s12 border-dotted center': !impede}" style="margin-left:7px">
    <div class="ajudaBox white" ref="help" v-if="help">
      <i class="material-icons right iconeFecharAjudaPergunta" title="Fechar Ajuda" v-on:click="ToggleAjuda" >close</i>
      <p>
        <span>
          {{ p.textoAjuda }}
        </span>
      </p>
    </div>
    <form>
      <div class="row">
        <i v-if="btnHelp"
          class="material-icons right iconeFecharAjudaPergunta"
          title="Fechar Ajuda"
          v-on:click="ToggleAjuda"
          >info_outline</i
        >
        {{ p.tx_pgta }}
      </div>
      <div class="row col s6 left-align">
        <p>
          <label>
            <input name="group1" ref="p1" type="radio" :disabled="status" v-on:click="gravarResposta(1)" />
            <span>Sim</span>
          </label>
        </p>
        <p>
          <label>
            <input name="group1" ref="p2" type="radio" :disabled="status" v-on:click="gravarResposta(2)" />
            <span>Não</span>
          </label>
        </p>
        <p v-if="p.aceita_prejudicado">
          <label>
            <input name="group1" ref="p3" type="radio" :disabled="status" v-on:click="gravarResposta(3)" />
            <span>Prejudicado</span>
          </label>
        </p>
      </div>
    <div class="col s6 row border-dotted"  v-bind:class="{ 'hide': !obs }">
      <span>Justificativa</span><p/>
      <input  id="" cols="30" :disabled="status" rows="2" class="justificativa" ref="justificativa" v-on:blur="gravarResposta()" :value="p.tx_obs">
    </div>
     <div class="col s6 row border-dotted"  v-bind:class="{ 'hide': !impede }">
       <span>{{p.tx_dilig}}</span><p/>
      <div class="col s12 white newtooltip" v-on:click="copiarDilig">
      <input  :id="'just'+p.id" cols="30" readonly rows="2" class="justificativa tooltipped" ref="dilig" data-tooltip="clique para copiar"  :value="message">
                <span class="tooltiptext" >clique para copiar</span>
              </div>
    </div>
    </form>
  </div>
</template>

<script>
import Pesquisa from "../services/pesquisa";
import M from "materialize-css";

export default {
  props: {
    p: Object,
    sumula: String,
    oprs:Array,
    protocolo:String,
    status:Boolean
  },
  data() {
    return {
      prejudicado: Boolean,
      help: false,
      obs: false,
      btnHelp:false,
      impede:false,
      message:""
    };
  },
  methods: {
    gravarResposta: async function (a) {
      const sumula = this.sumula;
      const prpt = 1;
      const id = this.p.id;
          if(a == 2 && this.p.exibe_msg_false){
          this.message = this.p.msg_false 
          M.toast({ html: this.p.msg_false });
      }else if(a == 1 && this.p.exibe_msg_true){
          M.toast({ html: this.p.msg_true})
      }else if(a == 3 &&  this.p.msg_prejudicado!=""){
          this.message = this.p.msg_false 
          M.toast({ html: this.p.msg_prejudicado})
      }
      console.log("value",this.$refs.justificativa.value.length )
      if(a == null){
      a =  this.selecao 
      }else{
         this.obs = false
      }
       if(a == 1 && this.p.rqdo_true){
         console.log("true")
                this.impede = false
                this.$emit("impede",{status:false, id: this.p.id})
        }else if(this.p.rqdo_true){
                M.toast({ html: "Atenção, essa resposta impede a conclusão do checklist"})
                this.impede = true
                this.$emit("impede",{status:true, id: this.p.id})
               
        }
      if(this.p.rqdo_just_true && (a == 1 )){
        this.obs = true
        if(this.$refs.justificativa.value =="" ||this.$refs.justificativa.value==null||this.$refs.justificativa.value.length <4 ){
           M.toast({ html: "Por favor, insira uma justificativa"})
           this.selecao = a
           return false;
        }
      }
      if(this.p.rqdo_just_false && (a ==2  )){
              this.obs = true
             
        if(this.$refs.justificativa.value =="" ||this.$refs.justificativa.value ==null||this.$refs.justificativa.value.length <4 ){
           M.toast({ html: "Por favor, insira uma justificativa"})
           this.selecao = a
           return false;
        }
      }
      if(a == 3 ){
          this.obs = true
           
        if(this.$refs.justificativa.value =="" ||this.$refs.justificativa.value ==null||this.$refs.justificativa.value.length <4 ){
          this.selecao = a
          M.toast({ html: "Por favor, insira uma justificativa"})
          return false;
        }
      }
      const obs = this.obs? this.$refs.justificativa.value: ""
      const r = await Pesquisa.gravarResposta(id, a, prpt, sumula, obs, this.protocolo);
     
      M.toast({ html: r.data.msg });
      this.$emit('resposta',id)
    },
    ToggleAjuda: async function () {
      this.help = this.help ? false : true;
    },
    copiarDilig: async function(){
      try{

        let y = document.getElementById(`just${this.p.id}`)
     y.select()
     document.execCommand('copy');
      M.toast({ html:"Texto Copiado com sucesso"})
      }catch(err){
        M.toast({ html:"Erro ao copiar"})
      }
    }
  },
  mounted(){

    console.log("pergunta ///" ,this.p)
      if(this.p.rpst != null){
        const j = this.p.rpst.toString()
        this.$refs[`p${j}`].checked = true
      }else{
        try{
          this.$refs['p1'].checked = false
          this.$refs['p2'].checked = false
          this.$refs['p3'].checked = false
        }catch(e){
      console.log(e)
        }
      }
      const h = this.p.tx_obs
      if(h !="" && h !=null){
        this.obs = true
      }
      const i = this.p.textoAjuda
      if(i  !="" && i !=null){
        this.btnHelp = true
      }
      const g = this.p.rqdo_true
      if(g && this.p.rpst != 1){
         this.$emit("impede",{status:true, id: this.p.id})
         this.impede = true
         this.message = this.p.msg_false
      }
     
  }
};
</script>

<style >
.ajudaBox {
  position: fixed;
  margin-left: 40%;
  padding: 10px;
  width: 300px;
  height: 200px;
  border: 1px solid #d0d0d0;
  border-radius: 12px;
  box-shadow: 5px 5px 5px #181414;
  z-index: 11000 !important;
  transform: translate(100px);
}
.diligBox {
  position: absolute;
  margin-left: -45%;
  margin-top: -5%;
  padding: 10px;
  width: 300px;
  min-height: 200px;
  border: 1px solid #d0d0d0;
  border-radius: 12px;
  box-shadow: 5px 5px 5px #181414;
}
.justificativa {
  max-height: 5em !important;
  max-width: 15em!important;
  width: 15em!important;
  resize: none
}

.border-dotted-red {
   border: 1px dotted red;
}
.newtooltip {
  position: relative;
  display: inline-block;
}

.newtooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -50px;
  opacity: 0;
  transition: opacity 0.3s;
  width: 200px;
}

.newtooltip .tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 30%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

.newtooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
  transform: translate(-2%);
}
.newtooltip .tooltiptext.left-align {
  margin-left: -150px;
}

.newtooltip:hover .tooltiptextRight {
  visibility: visible;
  opacity: 1;
  transform: translate(-2%);
}
.newtooltip .tooltiptextRight::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 60%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

.newtooltip .tooltiptextRight {
  visibility: hidden;
  width: 120px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: -115%;
  margin-left: -70px;
  opacity: 0;
  transition: opacity 0.3s;
  width: 200px;
}
</style>