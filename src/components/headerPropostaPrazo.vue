<template>
  <div ref="linha" v-bind:class="{ 'row col s12 light-blue darken-2': t.A, 'row col s12 light-blue darken-4': t.B }">
    <div class="col  white-text"  style="width:200px">
      {{ t.numOpr }} <br /> <input class="white-text tooltipped col s10 icon_hide" data-tooltip="clique para copiar"
        readonly @mouseover="showCopy" @mouseout="hideCopy" ref="numUnico" @click="copiarNumUnico"
        :value="t.numeroUnico"> <i class="material-icons  hide" ref="copy"
        style="position:absolute;">content_copy</i><br />{{ t.statusOpr }}
    </div>
    <div class="col white-text border-prop" style="width:50px">{{ ("000" + t.prf).slice(-4) }}</div>
    <div class="col  white-text  border-prop" style="width:50px">{{ t.sigla }}</div>
    <div class="col  white-text border-prop" style="width: 220px"><a
        :href="`https://gserv4935.intranet.bb.com.br/Deoc/?mci=${t.mciOpr}`" class="white-text tooltipped"
        data-tooltip="Clique para acessar o dossiê de operações" target="_blank"><i
          class="tiny material-icons">folder_shared</i> {{ t.operacao }}</a> </div>
    <div class="col  white-text  border-prop "  style="width:100px"><input class="tooltipped red-text" :id="'input' + t.numOpr"
        data-tooltip="Inclua um título razão para esse produto/modalidade" @focus="limparCampo" ref="inputRazao"
        v-if="t.razao == 'Não Identificado'" @change="atualizaRazao"><span v-else>{{ t.razao }}</span></div>
    <div class="col  white-text  border-prop" style="width:150px">
      <span class="" id="app" v-if="link">

        <a :href="linkNpj" class=" link tooltipped" data-tooltip="clique para acessar os dados do processo"
          target="_blank">{{ t.numNpj }}</a>
        <i v-show="vinculo" class="material-icons tooltipped" :data-tooltip="t.tipBeneficio">format_bold</i>
      </span>
      <span v-if="link">
        <i class="material-icons tooltipped" data-tooltip="Existe Rateio para esse NPJ" v-if="rateio">group</i>
        <i class="material-icons tooltipped" data-tooltip="Não existe Rateio para esse NPJ" v-if="!rateio">person</i>
      </span>
      <span v-else>
        {{ t.numNpj }}
      </span>
    </div>
    <div class="col white-text  border-prop" style="width:80px"> {{ t.proposta }}</div>
    <div class="col s1 white-text  border-prop">
      <currency-input class="white-text" ref="honorarios" :disabled="!link" v-on:blur="atualizaTotal('')"
        :value="t.honorarios" />
    </div>
    <div class="col s1 white-text  border-prop">
      <currency-input class="white-text" ref="custas" :disabled="!link" v-on:blur="atualizaTotal('')"
        :value="t.custas" />
    </div>
    <div class="col s1 white-text  border-prop "
      >
      <span class="white-text tooltipped" data-tooltip="ATENÇÃO- IOF refere-se a proposta, englobando TODAS as operações da proposta">{{ valorIof }}</span>
      <span class="badge tooltipped orange darken-1 black-text rounded" style="border-radius:16px" :data-tooltip="txtIof">{{t.tipIof}}</span>
    </div>
    <div class="col s1 white-text  border-prop">
      <currency-input class="white-text" ref="acordo" v-on:blur="atualizaTotal('')" :value="t.valorAcordo" />
    </div>
    <div class="col s1 white-text hide border-prop"><input class="white-text" :value="t.valorGRD"></div>
    <div class="col switch tooltipped" :data-tooltip="mensagemTooltip" style="width:60px">
      <p>
        <label>
          <input ref="check" :checked="status" :disabled="statusCheck" v-on:click="atualizaProposta" type="checkbox">

          <span></span>
        </label>
      </p>
    </div>
    <div v-show="(link && demandas && t.honorarios > 0)" v-bind:class="{ 'green-text ': contaAtribuida }"
      :data-tooltip="msg" @click="alteraConta" class="col  border-prop tooltipped cc">
      <i class="material-icons" @click="alteraConta">closed_caption</i>
    </div>
    <div v-show="(dilig)" data-tooltip="Solicitação de abertura de diligência de repasse de valores já foi gerada"
      class="col green-text border-prop tooltipped cc">
      <i class="material-icons">description</i>
    </div>
    <div class="row col s11">


      <NewOpr v-for="v in oprNew" :key="v.vinculado" :c="v" :k="v.vinculado" :t="v" :color="t" />

    </div>
    <!-- <div class="row" style="margin-left:16px" v-show="t.newOpr">
       <input class="white-text tooltipped col s10 icon_hide" data-tooltip="clique para copiar" readonly   @mouseover="showCopy"  @mouseout="hideCopy" ref="numUnico" 
        @click="copiarNumUnico" :value="t.newOpr.NR_UNCO_NOVO">
    </div> -->
  </div>
</template>
<script>
import Pesquisa from "../services/pesquisa";
import { getValue } from "vue-currency-input";
import M from "materialize-css";
import NewOpr from "./headerNewPropostaPrazo"
export default {
  props: {
    t: Object,
    k: Number,
    check: Boolean,
    statusCheck: Boolean,
    demandas: String,
    atualiza: Number,
    newOprs: [],
    verifica: String,
    carregado: Boolean

  },
  components: {
    NewOpr
  },
  data() {
    return {
      status: String,
      linkNpj: String,
      link: Boolean,
      mensagemTooltip: String,
      msgConta: String,
      conta: Boolean,
      contaAtribuida: false,
      contaOpr: Number,
      prefixoOpr: Number,
      msg: "",
      oprNew: [],
      dilig: false,
      rateio: false,
      vinculo: Boolean,
      valorIof: "",
      txtIof:""

    }
  }, beforeRender() {
    let tool = document.getElementById(`input${this.t.numOpr}`);

    M.Tooltip.init(tool)

  },
  computed() {
    return {
     
    }
  },

  async mounted() {
    await this.verificaGravado()
    // const r = await Pesquisa.recuperaValores(this.t.numeroUnico,this.t.protocolo)
    // this.t.honorarios = r.data[0] ? r.data[0].honorarios +0:0
    // this.t.custas     = r.data[0]? r.data[0].custas +0 : 0
    // this.t.valorAcordo = r.data[0]? r.data[0].acordo+0 : this.t.valorAcordo+0
    const status = await Pesquisa.oprDetails(this.t.numeroUnico, this.t.empreendimento, this.t.subContrato)
    const razao = await Pesquisa.oprRazao(this.t.codigoProduto, this.t.codigoModalidade)
    this.t.statusOpr = status.data.data.data.textoDescricaoCodigoEstadoVencimento
    this.msgConta = "clique para inserir uma conta de repasse de honorários"
    this.t.razao = razao.data.enq ? razao.data.enq : "Não Identificado"
    this.conta = false
    this.status = this.t.status
    if (this.t.status == "") {

      this.changeColor(false)
    } else {
      this.changeColor(true)
    }
    window.setTimeout(() => {
      var tool = document.querySelectorAll('.tooltipped');
      M.Tooltip.init(tool)
    }, 1500)
    const dilig = await Pesquisa.getDilig(this.t, this.demandas)
    if (dilig.data.localizado) {
      this.dilig = true
      this.$emit('dilig', this.t)
    } else {
      this.dilig = false
    }
    this.status = this.t.status
    this.$emit("acordo", { honorarios: this.t.honorarios, custas: this.t.custas, acordo: this.t.valorAcordo, numUnico: this.t.numeroUnico, status: this.t.status, tip: 2 });
    this.mensagemTooltip = (!this.statusCheck ? "Clique para alterar status da operação" : "Checklist finalizado, não é possível alterar o status da operação");
    this.valorIof =parseFloat(this.t.valorIof).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    
        const tipoIOF = [{
            codigo: "1",
            descricao: "À vista "
        }, {
            codigo: "2",
            descricao: "Financiado"
        }, {
            codigo: "3",
            descricao: "Isento"
        }]

        const f = tipoIOF.find(h=> h.codigo == this.t.tipIof)
        
        this.txtIof= f.descricao
  },
  async created() {
    this.linkNpj = this.t.numNpj != "Não Ajuizado" ? `https://juridico.intranet.bb.com.br/paj/juridico/v2?app=processoConsultaRapidoApp&anoProcesso=${this.t.numNpj.substring(0, 4)}&numeroProcesso=${this.t.numNpj.substring(5)}&variacaoProcesso=` : "#"
    this.link = this.t.numNpj == "Não Ajuizado" ? false : true
    if (this.link) {
      const r = await Pesquisa.getVinculo(this.t.numeroUnico)
      const rateio = await Pesquisa.getRateio(this.t.numNpj)
      this.rateio = rateio.data.data.RATEIO == "S" ? true : false
      this.$emit("rateio", { opr: this.t, rateio: this.rateio, tip: 1 })
      const g = r.data
      if (g.length > 0) {
        this.vinculo = true
        this.t.vinculo = true
        this.t.tipBeneficio = "vínculo de: " + g[0].tipo
      } else {
        this.t.vinculo = false
        this.vinculo = false
      }
    }

  },
  watch: {
    t: function () {
      this.linkNpj = this.t.numNpj != "Não Ajuizado" ? `https://juridico.intranet.bb.com.br/paj/juridico/v2?app=processoConsultaRapidoApp&anoProcesso=${this.t.numNpj.substring(0, 4)}&numeroProcesso=${this.t.numNpj.substring(5)}&variacaoProcesso=` : "#"
      this.link = this.t.numNpj == "Não Ajuizado" ? false : true
      this.verificaGravado()
    },
    k: function () {
      this.verificaGravado()
    },
    vinculo: function () {
      window.setTimeout(() => {
        var tool = document.querySelectorAll('.tooltipped');
        M.Tooltip.init(tool)
      }, 1500)
    },
    mensagemTooltip: function () {

      window.setTimeout(() => {
        var tool = document.querySelectorAll('.tooltipped');
        M.Tooltip.init(tool)
      }, 1500)
    },
    statusCheck: function () {
      this.mensagemTooltip = (!this.statusCheck ? "Clique para alterar status da operação" : "Checklist finalizado, não é possível alterar o status da operação")
      if (this.statusCheck && this.t.numNpj != "Não Ajuizado" && this.t.honorarios > 0) {
        this.$emit("protocoloRepasse", { valor: this.t.honorarios, numUnico: this.t.numeroUnico, npj: this.t.numNpj })
      }
    },
    demandas: function () {
      this.verificaGravado()
      // this.forceRerender()
      //console.log("demandas")
      this.renderComponent = true;
    },
    verifica: async function () {
      const dilig = await Pesquisa.getDilig(this.t, this.demandas)
      const r = await Pesquisa.recuperaValores(this.t.numeroUnico, this._props.t.protocolo, this.demandas);
      this.status = r.data[0].status ? "checked" : ""
      const situacao = r.data[0].status
      this.t.honorarios = r.data[0] ? r.data[0].honorarios : 0
      this.t.custas = r.data[0] ? r.data[0].custas : 0
      this.t.valorAcordo = r.data[0] ? r.data[0].acordo : 0
      this.changeColor(situacao)
      if (dilig.data.localizado) {
        this.dilig = true
        this.$emit('dilig', this.t)
      } else {
        this.dilig = false
      }
    },
    contaOpr: function () {
      if (this.contaOpr && this.contaOpr != 0 && this.prefixoOpr && this.prefixoOpr != 0) {
        this.contaAtribuida = true
        this.msg = "Agencia e Conta para Honorários atribuídas"
      } else {
        this.contaAtribuida = false
        this.msg = "Agencia e Conta para Honorários NÃO atribuídas"
      }
    }, prefixoOpr: function () {
      if (this.contaOpr && this.contaOpr != 0 && this.prefixoOpr && this.prefixoOpr != 0) {
        this.contaAtribuida = true
        this.msg = "Agencia e Conta para Honorários atribuídas"
      } else {
        this.contaAtribuida = false
        this.msg = "Agencia e Conta para Honorários NÃO atribuídas"
      }
      const tool = document.querySelectorAll('.tooltipped');
      M.Tooltip.init(tool)
    },
    atualiza: async function () {
      const dilig = await Pesquisa.getDilig(this.t, this.demandas)
      if (dilig.data.localizado) {
        this.dilig = true
        this.$emit('dilig', this.t)
      } else {
        this.dilig = false
      }
    },
    carregado: async function () {
      this.oprNew = []
      for await (let o of this.newOprs) {
        console.log('operaçao new ', o)
        const nrOriginal = o.nr_unco

        // const p = this.arrayPropostasPrazo.find(k=> k.numeroUnico == nrOriginal)
        if (this.t.numeroUnico == nrOriginal) {

          this.oprNew.push(o)
          console.log(o)
          break

        }
      }
    }
  },
  methods: {
    atualizaHonorarios: async function () {
      const status = this.$refs.check.checked
      const honorariosS = getValue(this.$refs.honorarios)
      if (honorariosS == this.t.honorarios) {
        return false
      }
      const honorarios = parseFloat(honorariosS.toString().replace(",", "."))
      await Pesquisa.atualizaValores(1, honorarios, this._props.t.numeroUnico, this._props.t.protocolo, this.t.numNpj, this.demandas)
      const r = await Pesquisa.recuperaValores(this.t.numeroUnico, this._props.t.protocolo, this.demandas)
      this.t.honorarios = r.data[0] ? r.data[0].honorarios : 0
      this.t.custas = r.data[0] ? r.data[0].custas : 0
      this.t.valorAcordo = r.data[0] ? r.data[0].acordo : 0
      const valorIof = this.t.tipIof == "1"? this.t.valorIof:0
      this.$emit("acordo", { honorarios: this.t.honorarios,valorIof, custas: this.t.custas, acordo: this.t.valorAcordo, numUnico: this.t.numeroUnico, status: status, tip: 2 })
    },
    atualizaCustas: async function () {
      const status = this.$refs.check.checked
      const custasS = getValue(this.$refs.custas)
      if (custasS == this.t.custas) {
        return false
      }
      const custas = parseFloat(custasS.toString().replace(",", "."))
      let w = await Pesquisa.atualizaValores(0, custas, this._props.t.numeroUnico, this._props.t.protocolo, this.t.numNpj, this.demandas)
      if (w) {
        const r = await Pesquisa.recuperaValores(this.t.numeroUnico, this._props.t.protocolo, this.demandas)
        this.t.honorarios = r.data[0] ? r.data[0].honorarios : 0
        this.t.custas = r.data[0] ? r.data[0].custas : 0
        this.t.valorAcordo = r.data[0] ? r.data[0].acordo : 0
        const valorIof = this.t.tipIof == "1"? this.t.valorIof:0
        this.$emit("acordo", { honorarios: this.t.honorarios,valorIof, custas: this.t.custas, acordo: this.t.valorAcordo, numUnico: this.t.numeroUnico, status: status, tip: 2 })
      }
    },
    atualizaTotal: async function () {
      const status = this.$refs.check.checked
      const acordoS = getValue(this.$refs.acordo)
      const custasS = getValue(this.$refs.custas)
      const honorariosS = getValue(this.$refs.honorarios)
      if (acordoS == this.t.acordo) {
        return false
      }
      const acordo = parseFloat(acordoS.toString().replace(",", "."))
      const custas = parseFloat(custasS.toString().replace(",", "."))
      const honorarios = parseFloat(honorariosS.toString().replace(",", "."))
      const valor = { custas, honorarios, acordo }
      await Pesquisa.atualizaValores(1, valor, this.t.numeroUnico, this.t.protocolo, this.t.numNpj, this.demandas)
      // await Pesquisa.atualizaValores(2,acordo,this._props.t.numeroUnico,this._props.t.protocolo)
      const r = await Pesquisa.recuperaValores(this.t.numeroUnico, this._props.t.protocolo, this.demandas)
      this.t.honorarios = r.data[0] ? r.data[0].honorarios : 0
      this.t.custas = r.data[0] ? r.data[0].custas : 0
      this.t.valorAcordo = r.data[0] ? r.data[0].acordo : 0
      const valorIof = this.t.tipIof == "1"? this.t.valorIof:0
      this.$emit("acordo", { honorarios: this.t.honorarios,valorIof, custas: this.t.custas, acordo: this.t.valorAcordo, numUnico: this.t.numeroUnico, status: status, tip: 2 })
    },
    atualizaProposta: async function () {
      const status = this.$refs.check.checked ? true : false
      this.status = this.t.checked ? true : false

      this.changeColor(status)
      await Pesquisa.atualizaStatus(this.t.numeroUnico, this._props.t.protocolo, status, this.demandas)
      this.$emit("acordo", { honorarios: this.t.honorarios, custas: this.t.custas, acordo: this.t.valorAcordo, numUnico: this.t.numeroUnico, status: status, tip: 2 })
    },
    changeColor: function (status) {


      if (status) {
        this.$refs.linha.classList.remove('grey')
        this.$refs.linha.classList.add('light-blue')
        if (this.t.A) {
          this.$refs.linha.classList.add('darken-2');
        } else {
          this.$refs.linha.classList.add('darken-4');
        }
      } else {
        this.$refs.linha.classList.add('grey')
        this.$refs.linha.classList.remove('light-blue')
        this.$refs.linha.classList.remove('darken-4');
        this.$refs.linha.classList.remove('darken-2');
      }

    },
    verificaGravado: async function () {
      //console.log("verificaGrasvado", this)
      const r = await Pesquisa.recuperaValores(this.t.numeroUnico, this._props.t.protocolo, this.demandas)
      //console.log(this.t.numeroUnico)
      this.t.status = (r.data[0] ? r.data[0].status == 0 ? "" : "checked" : "checked")
      this.status = this.t.status
      if (r.data[0]) {
        this.t.honorarios = r.data[0] ? r.data[0].honorarios : 0
        this.t.custas = r.data[0] ? r.data[0].custas : 0
        this.t.valorAcordo = r.data[0] ? r.data[0].acordo : 0
      } else {
        const valor = { custas: this.t.custas, honorarios: this.t.honorarios, acordo: this.t.valorAcordo }
        await Pesquisa.atualizaValores(1, valor, this.t.numeroUnico, this.t.protocolo, this.t.numNpj, this.demandas)

      }
    },
    atualizaRazao: async function () {
      const mod = this.t.codigoModalidade
      const prod = this.t.codigoProduto
      const operacao = this.t.operacao
      const sigla = this.t.sigla
      this.formataValor()
      const razao = this.$refs.inputRazao.value
      const reg = /(\d){5}[-](\d){4}/g
      if (razao.match(reg)) {
        const r = await Pesquisa.atualizaRazao(mod, prod, operacao, sigla, razao)
        M.toast({ html: r.data.msg });

      } else {
        M.toast({ html: "Atenção, título razão inválido, tente novamente" });

      }
    },
    formataValor: async function () {
      var razao = this.$refs.inputRazao.value
      // const reg = /(\d){5}[-](\d){4}/g
      razao = razao.replace(/[^0-9]+/g, "")
      this.$refs.inputRazao.value = razao
      const parte1 = razao.slice(0, 5);
      const parte2 = razao.slice(5, 9);
      if (razao.length == 9) {

        let textoAjustado = `${parte1}-${parte2}`
        // //console.log(textoAjustado)
        this.$refs.inputRazao.value = textoAjustado
      }
    },
    limparCampo: async function () {
      this.$refs.inputRazao.value = ""
    },
    copiarNumUnico: async function () {
      try {

        let y = this.$refs.numUnico;
        y.select();
        document.execCommand('copy');
        M.toast({ html: "Texto Copiado com sucesso" })
      } catch (err) {
        //console.log(err);
        M.toast({ html: "Erro ao copiar" });
      }
    },
    showCopy: function () {
      this.$refs.copy.classList.remove('hide')
    },
    hideCopy: function () {
      this.$refs.copy.classList.add('hide')
    },
    alteraConta: function () {
      this.$emit("alteraConta", { numUnico: this.t.numeroUnico, valor: this.t.honorarios, conta: this.contaOpr, prefixo: this.prefixoOpr, npj: this.t.numNpj })
    },
    forceRerender: function () {
      this.renderComponent = false;
      this.$nextTick(() => {
        this.renderComponent = true;
      });
    }
  },
};
</script>
<style>
.lineProposta {
  border-bottom: 1px solid white;
}

.border-prop {
  border-left: 1px solid white;
  min-height: 40px !important;
  height: 100% !important;
}

a.link {
  color: white !important
}

div.icon_hide>i {
  display: none
}

.icon_hide {
  cursor: pointer;
  margin-right: 0 !important;
  padding: 0 !important;
}

input:not([type]):disabled,
input:not([type])[readonly="readonly"],
input[type=text]:not(.browser-default):disabled,
input[type=text]:not(.browser-default)[readonly="readonly"],
input[type=password]:not(.browser-default):disabled,
input[type=password]:not(.browser-default)[readonly="readonly"],
input[type=email]:not(.browser-default):disabled,
input[type=email]:not(.browser-default)[readonly="readonly"],
input[type=url]:not(.browser-default):disabled,
input[type=url]:not(.browser-default)[readonly="readonly"],
input[type=time]:not(.browser-default):disabled,
input[type=time]:not(.browser-default)[readonly="readonly"],
input[type=date]:not(.browser-default):disabled,
input[type=date]:not(.browser-default)[readonly="readonly"],
input[type=datetime]:not(.browser-default):disabled,
input[type=datetime]:not(.browser-default)[readonly="readonly"],
input[type=datetime-local]:not(.browser-default):disabled,
input[type=datetime-local]:not(.browser-default)[readonly="readonly"],
input[type=tel]:not(.browser-default):disabled,
input[type=tel]:not(.browser-default)[readonly="readonly"],
input[type=number]:not(.browser-default):disabled,
input[type=number]:not(.browser-default)[readonly="readonly"],
input[type=search]:not(.browser-default):disabled,
input[type=search]:not(.browser-default)[readonly="readonly"],
textarea.materialize-textarea:disabled,
textarea.materialize-textarea[readonly="readonly"] {
  border: none !important
}
</style>
