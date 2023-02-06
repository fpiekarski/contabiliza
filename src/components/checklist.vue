<template>
    <div class=" row col s10 "><span><h4>Checklist</h4></span>
        <div v-if="impede" class="col s12" v-bind:class="{'hide': protocolo == ''}"><h5>Existe uma ou mais perguntas impedindo a conclusão do checklist</h5></div>
        <div v-if="protocolo == ''" class="col s12"><h5>Não há protocolo vinculado, isso impede a realização do checklist</h5></div>
        <div class="row col s12 center" v-bind:class="{'hide': protocolo == ''}">

        <Pergunta v-for="p in perguntas" :p="p" :key="p.id" :sumula="sumula" :protocolo="protocolo" v-on:resposta="setResposta" :status="status" v-on:impede="verificaImpedimento"/>
        </div> 
        <div class="row col s12" v-bind:class="{'hide': protocolo == ''}" >
            <span class="col s4">
        <button class="waves-effect waves-light btn" v-if="!status"  :disabled="impede" v-on:click="concluiCheck"><i class="material-icons">check</i>Conclui</button>
        <button class="waves-effect waves-light btn" v-if="status"  v-on:click="EditaCheck"><i class="material-icons">edit</i>Editar</button>
        </span>
        <div class="  ">

        <p v-if="status">
      <label>
        <input type="checkbox" @change="alteraDilig" />
        <span class="black-text">Habilita Botão Diligência</span>
      </label>
        </p>
        <button class="waves-effect waves-light btn" v-if="dilig && status"  v-on:click="gerarDiligenciaRepasse" style="margin-left:2%"><i class="material-icons">dns</i>Gerar Diligência Repasse</button>
        </div>

        </div>
    </div>
</template>
<script>
import Pergunta from "./pergunta"
import Pesquisa from '../services/pesquisa'
import M from "materialize-css";
export default {
    props:{
        sumula:String,
        perguntas:Array,
        oprs:Array,
        protocolo:String
    },
    data(){
        return{
            status:Boolean,
            impede : false,
            dilig: false
        }
    }, components: {
        Pergunta,
    },
    mounted(){
      this.statusCheck();
    
    },
    methods:{
        concluiCheck: async function(){
           const tip = 2
           for (let g of this.perguntas){
               console.log(g.rpst ==null, g.respondido == false)
               if(g.rpst ==null ){
                   if(!g.respondido ||g.respondido  == false){
                        M.toast({ html: "Responda todas as perguntas antes de concluir o checklist"})
                        return false
                   }
               }
           }
           const r =  await  Pesquisa.Update(this.protocolo,tip,this.oprs, this.sumula)
           M.toast({ html: r.data.msg})
           this.statusCheck()
        },
        EditaCheck: async function(){
            const tip = 1
            const r = await Pesquisa.Update(this.protocolo,tip)
            M.toast({ html: r.data.msg})
            this.statusCheck()
        },
        statusCheck: async function(){
          const t = await Pesquisa.verificaStatus(this.protocolo)
          this.status = t.data
          this.$emit('check',this.status)
        },
        verificaImpedimento: async function(o){
            if(o.status){
                let n = this.perguntas.find(l=> l.id == o.id)
                n.impede = true
                this.impede = true
            }else{
                let n = this.perguntas.find(l=> l.id == o.id)
                n.impede = false
                this.impede = false
                for await (let x of this.perguntas){    
                    if(x.impede){
                        this.impede = true
                    }
                }
            }
        },
        setResposta: async function(r){
            console.log(r)
            const v = this.perguntas.find(k=> k.id == r)
            v.respondido = true

        },
        gerarDiligenciaRepasse: function(){
            this.$emit('diligencia')
            
        },
        alteraDilig: function(o){
           this.dilig = o.target.checked
        }
    },watch:{
        perguntas:function(){
            this.statusCheck()
        },
        sumula: function(){
            this.statusCheck()
        },
         protocolo: function(){
            this.statusCheck()
            setTimeout(()=>{
                this.statusCheck()
            },1000)
        }

    }
}
</script>
