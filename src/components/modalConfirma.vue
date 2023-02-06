<template>
        <div id="modalRazao" class="modal  modal-fixed-footer">
                 <div class="modal-content row col s12">
                     <div class="input-field row  col  s3">
                         <input id="pesquisaRazao" type="text" class="validate" v-model="pesquisa">
                         <label for="pesquisaRazao" id="label-pesquisaRazao" >Pesquisar</label>
                     </div>   
                       <div class="switch row col s4 offset-s3">
                           <div>Filtro por Status</div>
                        <label>
                        Todos
                        <input type="checkbox" v-model="tipPesquisa">
                        <span class="lever"></span>
                        Inativos
                        </label>
                    </div>
            <ul class="col s10 row">
                <li class="col s12" ><span class="col s1" >Cod Produto</span><span  class="col s1">Cod Mod.</span><span  class="col s5">Transação</span><span  class="col s2">Enquadramento</span> <span>Status</span><span  class="col s1">Confirma</span><span  class="col s1">Cancela</span></li>
                <li  v-for="t in array" :key="t.codProd + t.codModalidade" class="col s12 linha-modal-razao"  ><span class="col s1">{{t.codProd}}
                    </span><span class="col s1" >{{t.codModalidade}}</span><span class="col s5">{{t.TRANSACAO}}</span><span class="col s2">{{t.enq}}</span>
                    <span class="green-text offset-s7" v-show="t.ativo == 1">Ativo</span>
                    <span class="red-text offset-s7" v-show="t.ativo == 0">Inativo</span>
                    <span class="col s1">
                    <i class="material-icons btn-modal tooltipped" data-tooltip="Confirma a Razão para a transação" @click="confirma(t.codProd, t.codModalidade,t.enq)">check</i></span>
                    <span class="col s1">
                    <i class="material-icons btn-modal tooltipped" data-tooltip="Marca como inativo" @click="cancela(t.codProd, t.codModalidade,t.enq)">cancel</i></span>
                </li>
            </ul>
                 </div>
                 <div class="modal-footer">
      <a class="modal-close waves-effect waves-green btn" >Fechar</a>
    </div>
        </div>
</template>
<script>
import Pesquisa from "../services/pesquisa";
import M from "materialize-css";
export default {
    props:{
        
    },
    data() {
        return {
            arrayPendentes:[],
            arraytotal:[],
            array:[],
            pesquisa:"",
            tipPesquisa:false
       }    
    },

    async mounted() {
        this.montaTabela()
    },
    watch:{
        pesquisa:function(){
            if(this.pesquisa ==""){
                this.array = this.arraytotal
            }
            this.array = this.array.filter(function(item){
                return item.TRANSACAO.toLowerCase().indexOf(this.pesquisa.toLowerCase()) > -1;
            }.bind(this))
        },
        tipPesquisa:function(){
            console.log(this.tipPesquisa)
            if(this.tipPesquisa){
                this.array = this.arrayPendentes
            }else{
                this.array = this.arraytotal
            }
        }
    },methods:{
        confirma:async function(codProd, codMod,enq){
            const retorno = await Pesquisa.UpdateStatusRazao(codProd, codMod,enq,true)
            this.montaTabela()
            M.toast({html: retorno.data.msg})
        },
        cancela:async function(codProd, codMod,enq){
            const retorno = await Pesquisa.UpdateStatusRazao(codProd, codMod,enq,false)
            this.montaTabela()
              M.toast({html: retorno.data.msg})
        },
        montaTabela:async function(){
            const retorno = await Pesquisa.getRazao()
        this.arraytotal = retorno.data
        this.arrayPendentes = this.arraytotal.filter(o=>o.ativo == 0)
        this.array = this.arraytotal
        }
    }
}
</script>

<style >
li.linha-modal-razao:hover{
    background-color: #054225;
    color:white
}

i.btn-modal:hover{
    background-color: #08bd65!important;
    color:white;
    border-radius: 50%;
}
</style>