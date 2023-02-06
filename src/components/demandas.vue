<template>
  <div class="row col s12" id="caixa_dados_gsv">
    <div class="row col s4 " id="label_box_gsv" style="margin-top:46px" >
      Vincular novo protocolo de contabilização a súmula
    <div  class="col  tooltipped modal-trigger" v-on:click="verificaAtribuido" style="margin-top:26px" href="#modalDemandas" data-tooltip="Clique para pesquisar e vincular o processo" id="vincular_gsv">
      <i class="material-icons font-3em">add</i>
    </div>
    </div>
    <div class="col s8 black-text">
      <div class="row col s12 input-field col border-dotted" id="div_protocolo" >
          <span><h5>Protocolos Vinculados a Sumula</h5></span>
        <div class="col s12 row" v-for="f in protocolos" :key="f.PROTOCOLO">
          <div class="col s1"><i :ref="f.ID" class="material-icons font-2em green-text tooltipped" data-tooltip="checklist concluido">check</i></div>
          <div class="setDemanda active col s8 " v-bind:class="{'teal darken-2 white-text':(Demanda == f.PROTOCOLO), 'tooltipped':(Demanda != f.PROTOCOLO)}" @click="setDemandas"  :data-demanda="f.PROTOCOLO"  :data-id="f.demandas"  style="margin-top:10px; border: dotted 1px black" disabled data-position="bottom" data-tooltip="Clique para conduzir esse protocolo" :id="f.demandas"  >{{f.PROTOCOLO}}
          </div>
          <i class="material-icons col s2 tooltipped btn-delete" @click="deleteDemandas" style="margin-top:10px;cursor:pointer" :data-delete="f.demandas" data-tooltip="Clique para desvincular esse protocolo">delete{{f.demandas}}</i>
        </div>
      </div>
    </div>
    <!-- <div v-if="status" class="col s1 tooltipped green-text"  data-tooltip="Checklist concluído, não é possível alterar o protocolo" id="">
      <i class="material-icons font-3em">check</i>
    </div> -->
    <div id="modalDemandas" class="modal col s12 grey darken-4 flow-text open" tabindex="0" style=" margin-left:-40%!important;" >
      <div class="row col s112">
		<a href="#!" id="FecharmodalGSV" class="modal-close waves-effect blue darken-3 btn "><i class="material-icons">close</i></a>
      </div>
		<div class="modal-content white-text row col s12" style="overflow:auto">
		<div class="row col s10">

      <div class="col s3">
        <label for="mciDemandas">MCI Pesquisa</label>
      <input type="text" class="white-text tooltipped" data-tooltip="Altere para pesquisar outro mci" id="mciDemandas" ref="mciDemandas" v-on:change="changeMci" :value="mci">
      </div>
    </div>
		<div class="row col s10">
    <div class="col s2 linha_demandas">Sistema</div>

    <div class="col s4 linha_demandas">Numero Demandas</div>
    <div class="col s3 linha_demandas">MCI Cliente</div>
    <div class="col s2 linha_demandas">Prefixo Origem</div>
          <div class="col s1 linha_demandas">Vincular</div></div>
          <div class="row col s10">
      <ul style="overflow:auto!important">
          <li  v-for="t in this.p"       :key="t.ID" >
            <div class="row col s12 border-dotted linha-demanda">
            <div class="col s2 linha_demandas">{{t.TIP}}</div>

              <div class="col s4 linha_demandas">{{t.PROTOCOLO}}</div>
            <div class="col s3 linha_demandas">{{t.MCI_PRINCIPAL}}</div>
            <div class="col s2 linha_demandas">{{t.PREF_DEMANDANTE}}</div>
            
            <div class="col s1 linha_demandas tooltipped newtooltip" data-tooltip="vincular protocolo"> 
              <i class="material-icons icone-add-protocolo" v-on:click="relacionaDemanda(t.ID, t.TIP);">add</i> 
            </div>
            </div>
          </li>
      </ul>
      <span class="red-text" v-if="zerado">Nenhuma demanda encontrada para o mci {{mci}}</span>
          </div>
    </div>
      
	</div>
  </div>
</template>
<script>
import Pesquisa from "../services/pesquisa";
import M from "materialize-css";
export default {
  props:{
    mci:[Number,String],
    sumula:String,
    status: Boolean,
    aleatorio:Number
  },
  data(){
    return{
      p:[],
      d:[],
      g:[],
      Demanda:"",
      zerado:false,
      protocolos:[]
    }
  },
  async mounted(){
    console.log('montado')
    const execute = [{demanda:this.buscaDemanda()}, {demanda:this.recuperaVinculo()},{demanda:this.statusCheck()}]
    try{
    for(let i of execute){
       await i.demanda
      
    }
    }catch(error){
      console.log(error)
    }
    
  },
  methods:{
    buscaDemanda: async function(){
      this.zerado= false
      const demandas = await Pesquisa.buscaDemandasMci(this.mci);
      console.log("buscando gsv")
      const gsv = await Pesquisa.buscaDemandasGsv(this.mci);
      this.p= demandas.data
      this.g = gsv.data
    for await(let j of this.p){
      j.TIP = "DEMANDAS"
    }
    for (let t of this.g){
        const h = {}
           h.TIP = "GSV"
           h.PROTOCOLO =  t.CD_PRC
           h.ID =  t.CD_PRC
           h.MCI_PRINCIPAL = t.MCI
           h.PREF_DEMANDANTE= t.CD_PRF_OPER
           this.p.push(h)
    }
      if(this.p.length == 0){
        this.zerado= true
      }else{
        this.zerado= false

      }
    },
    relacionaDemanda: async function(id, tip){
         if(this.protocolos.find(l=> l.ID == id)){
           M.toast({ html:"Atenção, protocolo já está vinculado a essa súmula, não é possível vincular novamente" , classes:"red white-text",  displayLength: 5000, activationPercent: 0.5 });
           return false
         }
      var a = {}
         if(tip == "DEMANDAS"){
           a = await Pesquisa.vinculaDemandasSumula(this.sumula,id,this.Demanda);
         }else{
           a = await Pesquisa.vinculaGsvSumula(this.sumula,id,this.Demanda);
         }
    if(a.data.status == true){
      // var fechar = "</span><a class='btn-flat toast-action amber-text accent-2-text' onclick='fecharToast()'>Fechar</a>"
           M.toast({ html: a.data.msg ,  displayLength: 3000, activationPercent: 0.5 });
           this.Demanda = a.data.protocolo.PROTOCOLO;
           this.retornaOprDemandas(a.data.protocolo.PROTOCOLO, tip);
         
            var tool = document.querySelectorAll('.tooltipped');
            M.Tooltip.init(tool)
            // const g = document.querySelectorAll("input[type=radio]")
            // for( let h of g){
            //   h.checked = false
            // }
    }else{
      M.toast({ html: a.data.msg ,  displayLength: 3000, activationPercent: 0.5 });
    }
    },
    recuperaDemanda: async function(){
      const a = await Pesquisa.retornaProtocoloSumula(this.sumula);
      if(a.data[0]){
        // var fechar = "</span><a class='btn-flat toast-action amber-text accent-2-text' onclick='fecharToast()'>Fechar</a>"
           M.toast({ html: "Em construção" ,  displayLength: 3000, activationPercent: 0.5 });
      }
    },
    retornaOprDemandas: async function(protocolo, tip){
      const o = await Pesquisa.retornaNumUnicosDemanda(protocolo, tip);
      this.$emit('vinculaProtocolo',o.data);
      var tool = document.querySelectorAll('.tooltipped');
      M.Tooltip.init(tool)
      this.recuperaVinculo()
    },
    recuperaVinculo: async function(){
      const a = await Pesquisa.retornaDemandasSumula(this.sumula);
      if(a.data){
        this.Demanda = a.data[0].PROTOCOLO ? a.data[0].PROTOCOLO :  a.data[0].protocolo;
        console.log('demandas **--**--**--*/*--' , this.Demanda)
          //  this.$emit("demanda",this.p[0]);
        this.$emit("demanda",{dem:this.Demanda});
        // a.data.map(m=>{
        //   console.log("Demandas *****",a)
        //   const hl = m.data
          // hl.Demanda = m.PROTOCOLO
          for( let h of a.data){
            if(h.PROTOCOLO == null && h.protocolo !=null){
              h.PROTOCOLO = h.protocolo
              h.ID = h.protocolo
              h.demandas = h.protocolo
            }
          }
          this.protocolos = a.data
        //   this.protocolos.push(hl)
        // })
      }
          var tool = document.querySelectorAll('.tooltipped');
            M.Tooltip.init(tool)
    },
    changeMci: function(){
      this.mci = this.$refs.mciDemandas.value
    },
     statusCheck: async function(){
       for( let h of this.protocolos){

         const t = await Pesquisa.verificaStatus(h.PROTOCOLO)

          h.statusCheck = t.data
            console.log("protocolo componenete",this.$refs[h.ID])
          if(t.data == true){
            this.$refs[h.ID][0].classList.remove('hide')
          }else{
            this.$refs[h.ID][0].classList.add('hide')

          }
       }
          // this.$emit('check',this.status)
    },
    verificaAtribuido: async function(){
      this.buscaDemanda()
      // if( this.Demanda != ""){
      //   alert('atenção, vincular novamente um protocolo apaga as respostas do checklist já preenchidas')
      // }
    },
    setDemandas: async function(o){
      const alvo = o.target
      const data = alvo.dataset.id
      const dem = alvo.dataset.demanda
      //const ele = document.querySelectorAll('.setDemanda')
      // const el = document.getElementById(alvo.dataset.id)
      // console.log(el)
      // el.classList.remove('tooltipped')
      if(this.Demanda == dem){
        return false
      }
      this.Demanda = dem
     
      this.$emit("demanda",{data,dem:this.Demanda});

    },
    deleteDemandas: async function(o){
      console.log(o)
      const alvo = o.target
      const data = alvo.dataset.delete
      const r = await Pesquisa.deleteDemandasProtocolo(data,this.sumula)
      M.toast({ html: r.data.msg,  displayLength: 3000, activationPercent: 0.5 });
      this.recuperaVinculo()
    }

  },watch:{
    mci:async function(){
      this.buscaDemanda()
    },
    status:async function(){
        var tool = document.querySelectorAll('.tooltipped');
        M.Tooltip.init(tool)
        var elems = document.querySelector('#modalDemandas');
        M.Modal.init(elems);
    },
    aleatorio:async function(){
      this.statusCheck()
    }
  }
}
</script>
<style >
#caixa_dados_gsv{
 height: 100%;
 min-height: 309px;
}
#modalDemandas{
   margin-left:-40%!important;
}
#vincular_gsv{
  cursor: pointer;

}
.setDemanda{
  cursor:pointer;
  margin-left:1em!important
}
.setDemanda:hover{
  background-color: aquamarine;
}
.btn-delete:hover{
  color: brown
}
#div_protocolo{
  min-height: 280px;
}
</style>