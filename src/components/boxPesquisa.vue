<template>
  <div>
    <div class="fundoAzul" id="conteudo-body" v-if="!sumulaUrl">
      <div class="box-logo col s1 white-text" id="caixa-texto-app">
        <span>Efetue a busca selecionando uma das opções abaixo: </span>
      </div>

      <div class="container col s12 AzulEscuro" id="menuSuperior">
        <div class="row CaixaSuperior">
          <span class="col s12 white-text rotulo-pesquisar">SELECIONE UMA DAS OPÇÕES PARA BUSCAR
          </span>
        </div>
      </div>
      <div class="row col s12 LinhaMenu">
        <div class="col s5 internaMenu " id="psqSemDemanda">
          <div class="col s3 margem-menu">
            <div class="bordaBranca divMenu tooltipped center-align" data-tooltip="Pesquisa por Número da Súmula"
              id="nrSumula" @click="abrePesquisa('nrSumula')">
              <span class="white-text">Nº DA SÚMULA</span>
            </div>
          </div>
          <div class="col s3 margem-menu">
            <div class="bordaBranca divMenu tooltipped center-align" data-tooltip="Pesquisa por MCI do cliente" id="mci"
              @click="abrePesquisa('mci')">
              <span class="white-text">MCI</span>
            </div>
          </div>
          <div class="col s3 margem-menu">
            <div class="bordaBranca divMenu tooltipped center-align" data-tooltip="Pesquisa por CPF do cliente" id="cpf"
              @click="abrePesquisa('cpf')">
              <span class="white-text">CPF</span>
            </div>
          </div>
          <div class="col s3 margem-menu">
            <div class="bordaBranca divMenu tooltipped center-align" data-tooltip="Pesquisa por CNPJ do cliente"
              id="CNPJ" @click="abrePesquisa('CNPJ')">
              <span class="white-text">CNPJ</span>
            </div>
          </div>
        </div>
        <div class="col s5 internaMenu hide" id="psqNumeroDemanda">
          <div class="col s4 margem-menu">
            <div class="bordaBranca divMenu tooltipped center-align" data-tooltip="Pesquisa por Número da Súmula"
              id="nrSumula" @click="abrePesquisa('nrSumula')">
              <span class="white-text">Nº DA SÚMULA</span>
            </div>
          </div>

          <div class="col s4 margem-menu hide">
            <div class="bordaBranca divMenu tooltipped center-align" data-tooltip="Pesquisa por Número do GSV"
              id="nrGSV" disabled="disabled" @click="abrePesquisa('nrGSV')">
              <span class="white-text">Nº GSV</span>
            </div>
          </div>

          <div class="col s4 margem-menu hide">
            <div class="bordaBranca divMenu tooltipped center-align" data-tooltip="Pesquisa por Número da Demanda"
              id="demanda" @click="abrePesquisa('demanda')">
              <span class="white-text">Nº DEMANDA</span>
            </div>
          </div>
        </div>
      </div>
      <div class="col s12 row hide">
        <a href="#" @click="abreLinhaPsq" data-tipo="true">Pesquisa sem Nº de demanda</a>
      </div>
      <div>
        <div class="row hide" id="pesquisa">
          <div class="input-field col s6" id="campo-psq">
            <input id="txt-pesquisa" value="" type="text" class="validate" @keyup="validaPesquisa" />
            <label for="txt-pesquisa" id="label-txt-psq"></label>
          </div>
          <div class="col s2">
            <a class="waves-effect white-text" id="btn-pesquisa" @click="pesquisa">
              <i class="material-icons">search</i>Pesquisa</a>
          </div>
        </div>
        <div class="result white-text hide">
          <table border="1" class="white-text">
            <tr>
              <th>Nº DA SÚMULA</th>
              <th>CLIENTE</th>
              <th>Nº DE OPERAÇÕES</th>
              <th>VALOR TOTAL</th>
              <th>STATUS DA SÚMULA</th>
              <th></th>
            </tr>

            <tbody id="tbody">
              <tr v-for="(tr, index) in linhas" :key="index">
                <td>{{ tr.sumula }}</td>
                <td>{{ tr.nome }}</td>
                <td>{{ tr.numOpr }}</td>
                <td>{{ tr.valor }}</td>
                <td class="yellow-text">{{ tr.status }}</td>
                <td>
                  <i class="material-icons"
                    @click="selecionaSumula(tr.nrSumula, tr.sumula, tr.status)">arrow_forward_ios</i>
                </td>

                <!-- <trSumula
                  :nrSumula="tr.nrSumula"
                  :cliente="tr.nome"
                  :valor="tr.valor"
                  :status="tr.status"
                /> -->
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div id="spinnerDiv" class="hide center" v-if="sumulaUrl">
        <img src="../assets/loading.gif" alt="Spinner" id="spinner" height="50" />
        <span id="erroAjax" class="hide">Ocorreu um erro, por favor tente novamente
        </span>
      </div>
      <div>

        <div class="col s12 hide red white-text" id="warning"></div>
      </div>
    </div>
  </div>
</template>

<script>
// import M from "materialize-css";
import "material-design-icons/iconfont/material-icons.css";
import Pesquisa from "../services/pesquisa";
// import trSumula from "./trSumula.vue";
export default {
  name: "BoxPesquisa",
  props: {
    msg: String,
    selecionado: Boolean,
  },
  mounted() {
    // M.AutoInit();
    this.pesquisaSumula()

  },
  data() {
    return {
      linhas: [],
      sumula: "",
      pesquisando: true,
      sumulaUrl: true,
      statusSumula: ""
    };
  },
  methods: {
    pesquisaSumula: async function () {

      const locate = window.location
      if (locate.search) {
        const ende = locate.search.split("=")
        const index = ende.findIndex(o => o === "?sumula")
        const sumulaPesquisa = ende[index + 1]
        this.pesquisando = true
        const t = await this.consultaPorSumula(sumulaPesquisa)
       
       
        if (!t) {

          this.pesquisando = false
          window.locate = locate.split("?")[0]
        }
      } else {
        this.pesquisando = false
        this.sumulaUrl = false
      }

    },
    validaPesquisa: function (a) {
      console.log(a)
      if (a.keyCode == 13) {
        this.pesquisa()
      }
      //  var chCode = ('charCode' in a) ? a.charCode : a.keyCode;
      //       alert ("The Unicode character code is: " + chCode);
    },
    abrePesquisa: function ($event) {
      console.log($event);
      const t = document.getElementById("pesquisa");
      t.dataset.tipo = $event;
      t.classList.remove("hide");
    },
    abreLinhaPsq: function ($el) {
      const alvo = $el.target;
      if (alvo.dataset.tipo == "true") {
        document.getElementById("psqSemDemanda").classList.remove("hide");
        document.getElementById("psqNumeroDemanda").classList.add("hide");
        alvo.dataset.tipo = "false";
        alvo.innerText = "Pesquisa com Nº de demanda";
        document.getElementById("pesquisa").classList.add("hide");
      } else {
        alvo.dataset.tipo = "true";
        document.getElementById("psqSemDemanda").classList.add("hide");
        document.getElementById("psqNumeroDemanda").classList.remove("hide");
        alvo.innerText = "Pesquisa sem Nº de demanda";
        document.getElementById("pesquisa").classList.add("hide");
        document.querySelector(".result").classList.add("hide");
      }
    },
    pesquisa: function () {
      const dado = document.getElementById("txt-pesquisa").value.trim();
      const tipo = document.getElementById("pesquisa").dataset.tipo;
      const nrPessoal = ["mci", "cpf", "cnpj"];
      if (nrPessoal.includes(tipo)) {
        Pesquisa.pesquisa(tipo, dado).then(async (retorno) => {
          var dados = retorno.data[0].data;
          var detalhes = retorno.data[1];
          let Sumula = dados.listaOcorrenciaTabela;
          const r = [];
          //java vai fazer mais um get por sumula encontrada e inserir dados(qtd operações) no JSON de retorno
          for await (let i of Sumula) {
            const nome = i.nomeCliente;
            // let prefixoSumula = Sumula[i].codigoPrefixoDependencia;
            const nrSumula = String(i.codigoDossieRecuperacaoCredito);
            // let NrSumulaCompleto = NrSumula.substring(0, 4) + "/" + prefixoSumula + "/" + NrSumula.substring(4);
            // let NomeCliente = Sumula[i].nomeCliente;
            const details = detalhes.find((o) => o.sumula == nrSumula);
            const operacoesValor = details.data.listaTabelaOcorrencia;
            // var objSumula = { NrSumula, NrSumulaCompleto };
            // sumulasRetorno.push(objSumula)
            var numOpr = 0;
            var valor = 0;
            for (let y in operacoesValor) {
              numOpr += 1;
              let saldo = parseFloat(
                String(operacoesValor[y].valorSaldoDevedorAtualizado).replace("-","")
              );
              valor += saldo;
            }
            let status = i.textoDescricaoEstadoDossie;
            // let EstadoSumula = Sumula[i].textoDescricaoEstadoDossie;
            // let DataDossie = Sumula[i].dataAberturaDossie;
            // let operacoes = detalhes[i].data.quantidadeOcorrenciaTabela
            // var elementoRetorno = new Builder_Retorno_Sumula(NrSumulaCompleto, NomeCliente, operacoes, formataDinheiro(valor), statusSumula, NrSumula)
            const sumula =
              nrSumula.substring(0, 4) +
              "/" +
              i.codigoPrefixoDependencia +
              "/" +
              nrSumula.substring(4);
            r.push({
              nrSumula,
              nome,
              valor: formataDinheiro(valor),
              status,
              numOpr,
              sumula,
            });
          }
          this.linhas = r;

          document.querySelector(".result").classList.remove("hide");
        });
      } else if (tipo == "nrSumula") {

        this.consultaPorSumula(dado)
      } else {
        Pesquisa.PesquisaDemandaProtocolo(tipo, dado).then(async (retorno) => {
          if (retorno.status == 200) {
            const sumula = dado.split('/')
            if (retorno.data[0].length > 0) {

              this.$emit("seleciona", { sumula: `${sumula[0]}${sumula[2]}`, sumulaCompleta: dado });
            } else {
              document.getElementById('warning').classList.remove('hide')
              const r = document.getElementById('warning')
              r.innerText = 'Sumula ou protocolo não localizados, tente novamente'
              window.setTimeout(() => {
                document.getElementById('warning').classList.add('hide')
              }, 2500);
            }
          } else {
            console.log('não ok')

          }
        });
      }
      function formataDinheiro(n) {
        return (
          "R$ " +
          n
            .toFixed(2)
            .replace(".", ",")
            .replace(/(\d)(?=(\d{3})+,)/g, "$1.")
        );
      }
    },
    selecionaSumula: function (S, sumulaCompleta, statusSumula) {
      this.sumula = S;
      
      this.$emit("seleciona", { sumula: this.sumula, sumulaCompleta, statusSumula });
    },

    consultaPorSumula: async function (dado) {
      return await Pesquisa.retornaSumula(dado).then(async (retorno) => {
        console.log(retorno)
        if (retorno.status == 200) {
          const sumula = dado.split('/')
          if (retorno.data[0].propostas) {
            this.$emit("seleciona", { sumula: `${sumula[0]}${sumula[2]}`, sumulaCompleta: dado, statusSumula: this.statusSumula });
          } else {
            document.getElementById('warning').classList.remove('hide')
            const r = document.getElementById('warning')
            r.innerText = 'Sumula ou protocolo não localizados, tente novamente'
            window.setTimeout(() => {
              document.getElementById('warning').classList.add('hide')
            }, 2500);
            this.pesquisando = false
            return false
          }
          return true
        } else {
          document.getElementById('warning').classList.remove('hide')
          const r = document.getElementById('warning')
          r.innerText = 'Sumula ou protocolo não localizados, tente novamente'
          window.setTimeout(() => {
            document.getElementById('warning').classList.add('hide')
          }, 2500);
          this.pesquisando = false
          return false;
        }

      });
    },

    retornaSumula: function () {
      return this.sumula;
    },
  },
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logo-bb {
  text-align: center;
}

#conteudo-body {
  margin-left: 15em;
}

.box-titulo {
  border: none;
  border-width: 1px;
  border-color: #0e7594;
  background: linear-gradient(50deg, rgb(19, 98, 145) 10%, rgb(6, 65, 75) 120%);
  min-width: 190px;
}

.box-logo {
  position: absolute;
  margin-left: 10em;
  margin-top: 5%;
  transform: translatey(-20%) translateX(-40%);
}

#caixa-logo-app {
  position: absolute;
  margin-top: 0%;
}

html {
  background: linear-gradient(to left,
      rgb(3, 53, 82) 100%,
      rgb(6, 81, 100) 100%);
  margin: 0% !important;
  padding: 0%;
}

.AzulEscuro {
  background-color: #072f46;
  margin-left: 10%;
  margin-right: 5%;
  height: 20% !important;
  border: solid;
  border-color: #979899;
  border-width: 1px;
}

#menuSuperior {
  margin-top: 12%;
  margin-left: -4%;
  height: 20% !important;
}

.erroObs {
  background-color: grey;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px;
  border-color: red;
  border-style: solid;
}

.margem-menu {
  padding: 1px;
}

.bordaBranca {
  border: rgb(141, 139, 139);
  border-style: solid;
  height: 100%;
  padding-left: 10px !important;
  margin-left: 10px;
  text-align: center;
  cursor: pointer;
}

.divMenu {
  height: 120px;
  text-align: center;
  padding-top: 30%;
  padding-left: 2%;
  padding-right: 4%;
}

.divMenu:hover {
  background: linear-gradient(50deg, rgb(19, 98, 145) 10%, rgb(6, 65, 75) 120%);
}

.divMenu span {
  position: relative;
  text-decoration-style: double;
}

.box-logo {
  position: absolute;
  margin-left: 5em;
  margin-top: 2%;
  transform: translatey(-50%) translateX(-50%);
}

#caixa-logo-app {
  position: absolute;
  margin-top: 0%;
}

.CaixaSuperior {
  display: absolute;
  padding-left: 60%;
  padding-top: 9%;
}

.rotulo-pesquisar {
  margin-right: 0%;
  text-decoration: none;
  justify-content: right;
}

.internaMenu {
  margin: 0px;
  padding: 0px !important;
}

.box-titulo {
  border: none;
  border-width: 1px;
  border-color: #0e7594;
  background: linear-gradient(50deg, rgb(19, 98, 145) 10%, rgb(6, 65, 75) 120%);
  min-width: 190px;
}

.LinhaMenu {
  padding: 3% 2% 2% 4%;
}

.logo-gecor-grey {
  color: darkgrey;
}

#pesquisa {
  top: 50%;
  position: relative;
  vertical-align: middle;
}

#btn-pesquisa {
  width: 100%;
  top: 50%;
  margin-top: 15%;
  text-align: center;
  background: linear-gradient(50deg,
      rgb(4, 43, 66) 10%,
      rgb(63, 158, 175) 120%);
  transition: 2s;
}

#btn-pesquisa:hover {
  background: linear-gradient(-50deg,
      rgb(4, 43, 66) 10%,
      rgb(63, 158, 175) 120%);
}

#campo-psq {
  top: 50%;
}

.pointer {
  cursor: pointer;
}

.logo-bb {
  text-align: center;
}

#caixa-texto-app {
  position: absolute;
  margin-top: -2%;
  margin-left: 35em;
  letter-spacing: 0px;
  font-size: 20px;
  text-overflow: clip;
}

#txt-pesquisa:hover {
  background: #ffffff;
  margin-bottom: 2px;
  color: black;
}

#txt-pesquisa:focus {
  background: #ffffff;
  margin-bottom: 2px;
  color: black;
}

#txt-pesquisa {
  color: white;
}

#label-txt-psq.active {
  position: absolute;
  margin-bottom: 20em;
  font-size: 15px;
}

.emConstrucao {
  cursor: not-allowed;
}

.icone_sumula:hover {
  color: green;
}

.SucessoComunic {
  background-color: grey;

  margin-left: auto;
  margin-right: auto;
  border: 2px;
  border-color: green;
  border-style: solid;
  color: #ffd700;
  display: flex;
  justify-content: center;
  align-items: center;
}

.SucessoBemVindo {
  background-color: white;

  margin-left: auto;
  margin-right: auto;
  border: 2px;
  border-color: gold;
  border-style: solid;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
}

.material-icons:hover {
  cursor: pointer;
  color: green;
}
</style>
