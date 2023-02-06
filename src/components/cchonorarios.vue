 
 <template>
    <div> 
 <a class="waves-effect waves-light btn modal-trigger hide" ref="linkModalCC" @click="setFalse" href="#modalCC">Modal</a>
  <div id="modalCC" class="modal">
    <div class="modal-content">
      <h4>Repasse de Honorários</h4>
      <span>Operação - Numero Único: {{numUnico}}</span>
      <p>Inclusão de número de conta em protocolo de repasse de honorários</p>
    </div>
      <div class="switch tooltipped" style="padding:1em; border:dotted 1px ;margin: 1em" data-tooltip="Ao marcar essa opção, os protocolos de repasse serão vinculados a essa conta">
          <span style="" >Deseja marcar essa conta para repasse em todas operações ativas desse protocolo</span>
          <p/>
    <label >
      Não
      <input ref="check" type="checkbox" @change="checkChange">
      <span class="lever"></span>
      Sim
    </label>
  </div>
    <p/>
    <div class="row" style="padding:1em; border:dotted 1px ;margin: 1em">
      <div class="col s12 row">
         <span style="" >Insira a agência e conta para débito de repasse de honorários</span>
      </div>
    <div class="input-field col s3">
      <input v-model="prefixo" id="first_name2" type="text" class="validate">
      <label class="active" for="first_name2">Prefixo:</label>
    </div>
    <div class="input-field col s3">
      <input v-model="conta" id="first_name2" type="text" class="validate">
      <label class="active" for="first_name2">Conta:</label>
    </div>
  </div>
    <div class="modal-footer">
      <a href="#!" class="waves-effect green waves-green btn-flat tooltipped" @click="alteraConta" data-tooltip="Salvar Alterações" style="margin-right:20px">Confirma</a>
      <a href="#!" class="modal-close waves-effect waves-green btn-flat red darken-4 tooltipped" data-tooltip="Fechar sem alterar">Fechar</a>
    </div>
  </div>
    </div>
 </template>
<script>
import M from "materialize-css";

export default {
      props:{
      
       numUnico:{type:[String,Function,Object],default:""},
       npj:{type:[String,Function,Object],default:""},
       random:{type:[String,Function,Object],default:""},
       conta1:String,
       prefixo1:String
    },
    data(){
      return{
         prefixo: "",
         conta:"",
        setAll:false,
        check:false,
        Vprefixo:"",
        Vconta: "",
      }
    },
    computed: {

    },
    mounted(){
     const tool = document.querySelectorAll('.tooltipped');
     M.Tooltip.init(tool)
    },
    methods:{
      checkChange: function(o){
       this.setAll = o.target.checked
       console.log(this.setAll)
     
      },setFalse: function(){
        this.$refs.check.checked = false
      },
      alteraConta: function(){
        if(this.setAll){
         console.log("emit all")
         this.$emit('setAll',{numUnico:this.numUnico,conta: this.conta,prefixo: this.prefixo})
        }else{
         console.log("emit unique")
         this.$emit('setUnique',{numUnico:this.numUnico,conta: this.conta,prefixo: this.prefixo})
        }
        this.setAll= false
      }
    },
    watch:{
      numUnico: function(){
        this.$refs.linkModalCC.click()
      },
      random: function(){
        this.$refs.linkModalCC.click()
      },conta1: function(){
        this.conta = this.conta1
      },prefixo1: function(){
        this.prefixo = this.prefixo1
      }
    
      
    }
}
</script>

