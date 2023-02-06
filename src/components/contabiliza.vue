<template>
  <div>
    <div class="col s12" v-show="!loaded">
      <div id="preloader_1">
      </div>
      <div id="preloader_2" style="margint-top:50%!important">
        <img src="https://gs4935.intranet.bb.com.br/contabiliza/img/CONECTA.png" alt="10px"
          style="margin-top:20%!important">
        <div id="per2" name="animação_css">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
    <div v-show="loaded">
      <div class="fundoAzul" id="conteudo-body">
        <div class="box-logo col s5" id="caixa-logo-app">
          <div class="col s3">
            <div class="card box-titulo">
              <div class="card-content white-text">
                <a :href="page">
                  <div class="row logo-bb tooltipped" data-tooltip="Clique para retornar para a página inicial"
                    id="nomeFerramenta">
                    <img src="https://gserv4935.intranet.bb.com.br/Conecta/imagens/CONECTA.png" />
                  </div>
                </a>
                <div class="row hide">
                  <div class="center-align tooltipped" data-tooltip="Clique para retornar para a página inicial"
                    data-position="left">
                    <SPAN>CONECTA</SPAN>
                  </div>
                </div>
                <div class="row center-align logo-gecor-grey hide">
                  Gecor Serviços
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="box-logo col s1 white-text" id="caixa-texto-app"></div>

        <nav>
          <div class="nav-wrapper">
            <ul id="nav-mobile " class="hide-on-med-and-down">
              <li><a target="_blank"
                  :href="`https://gs4935.intranet.bb.com.br/Conecta/?sumula=${this.sumula}&mci=${this.mci}`">FORMALIZAÇÃO</a></li>
              <li class="ativo"><a href="#">CONTABILIZAÇÃO</a></li>
              <li><a target="_blank"
                  :href="`https://gserv4935.intranet.bb.com.br:9092/gecor/institucional/credito/novoPop/pop_hon.php`">HONORÁRIOS</a></li>
              <li><a target="_blank"
                  :href="`https://gs4935.intranet.bb.com.br/posContabiliza/?sumula=${this.sumula}`">POS-CONTABILIZAÇÃO</a>
              </li>
              <li><a target="_blank"
                  :href="`https://gs4935.intranet.bb.com.br/conducao/?sumula=${this.sumula}`">CONDUÇÃO</a></li>
              <li><a target="_blank" :href="`https://gs4935.intranet.bb.com.br/visaoGeral/?sumula=${this.sumula}`">VISÃO
                  GERAL</a></li>
            </ul>
          </div>
        </nav>
        <div class="row col s11 menuSuperior" id="">
          <div class="row col s5" id="caixa_nome_superior" style="border-radius: 4px; margin:1px;">
            <div class="fundo_branco pad-left-1em">
              <div class="row col s12">
                <div class="row col s10">
                  <h5>
                    <i class="material-icons">description</i>
                    <span class="">SUMULA <span id="numSumula">{{ sumula }}</span>
                    </span>
                  </h5>
                </div>
                <!-- <div class="col s2">
                <a
                  class="btn tooltipped lime accent-1 black-text"
                  data-tooltip="Checklist triagem"
                  id="checkListTriagem"
                  ><i class="material-icons">playlist_add_check</i>
                  <span class="black-text" style="font-size: 8px">Triagem</span>
                </a>
              </div> -->
              </div>
              <div class="row col s12">
                <div>
                  <span class="tooltipped strong" id="NomeClientes" data-position="bottom" hidden="true">
                    <h5>
                      <i class="material-icons">person</i>{{ cliente1 }}
                    </h5>
                  </span>
                </div>
              </div>
            </div>

            <div class="row fundo_branco" id="dados_despacho_sumula">
              <div class="row caixa_dados_sumula">
                <div class="col s4">
                  <div class="row teal lighten-4 nome_item">
                    <i class="material-icons">date_range</i><span class="center">DATA POSIÇÃO:</span>
                  </div>
                  <div class="row center valor_item teal lighten-5">
                    <strong>
                      <span class="center" id="dataPosicao">{{ dataPosicao }}</span></strong>
                  </div>
                </div>
                <!-- </div>
         <div class="row caixa_dados_sumula"> -->
                <div class="col s4">
                  <div class="loader"></div>
                  <div class="row teal lighten-4 nome_item tooltipped hide newtooltip" id="divDespacho">
                    <!-- <span class="tooltiptext" id="">Clique para poder copiar</span> -->
                    <i class="material-icons">done</i>
                    <span class="center">DATA DESPACHO: </span>
                  </div>
                  <div class="row center valor_item teal lighten-5">
                    <strong>
                      <span class="center" id="datasDespachos">{{dataDespacho}}</span></strong>
                  </div>
                  <div class="row center teal lighten-5 hide" id="copy-votantes">
                    <div class="col s12"><span id="timeCopy"></span></div>
                    <textarea readonly="readonly" rows="6" cols="6"></textarea>
                  </div>
                </div>
                <!--         </div>
         
         <div class="row caixa_dados_sumula"> -->
                <div class="col s4">
                  <div class="row teal lighten-4 nome_item">
                    <i class="material-icons">attach_money</i>
                    <span class="strong">VALOR PARA DEFINIÇÃO DE ALÇADA:</span>
                    <div class="row center valor_item teal lighten-5">
                      <strong>
                        <span class="center" id="ValorAlcada">{{valorAlcada}}</span></strong>
                    </div>
                  </div>
                </div>
                <div class="col s12 white newtooltip">
                  <div class="white div_texto_over" id="tx_enquadramento"></div>
                  <span class="tooltiptext" id="tx_enquadramento_tooltip"></span>
                </div>
                <div class="col s11 white newtooltip">
                  <div class="white div_texto_over" id="tx_comite"></div>
                  <span class="tooltiptext" id="tx_comite_tooltip"></span>
                </div>
                <div class="col s1">
                  <a data-target="modalComplemento" class="right modal-trigger tooltipped"
                    data-tooltip="Existem Cláusulas Não Padronizadas"><span id="icone_clausula_padrao"></span></a>
                </div>
              </div>
            </div>
          </div>
          <div class="col s6" style="min-height: 20% !important;">
            <Demandas :mci="mci" :sumula="this.sumula" :status="statusCheck" :aleatorio="aleatorio" v-on:demanda="setDemandas" />
            <Timeline v-show="1 < 0" />
          </div>
        </div>
      </div>
      <div class="row col s12 white-text center">
        <h5>Protocolo atual: <span class="yellow-text">{{ protocolo }}</span></h5>
      </div>
      <div class="row col s12">
        <div class="col s7" style="margin-left:0%">
          <h5 class="white-text">Status da Súmula: <span class="yellow-text">{{ statusSumula }}</span></h5>
        </div>
        <div class="row col s6">

          <a class="waves-effect waves-light btn modal-trigger tooltipped" data-tooltip="Checklist" ref="modalCheck"
            v-on:click="montaCheck" href="#modalChecklist"><i class="material-icons">format_list_bulleted</i></a>
          <a class="waves-green btn tooltipped" data-tooltip="acesso ao POP" style="margin-left:16px"
            href="https://gserv4935.intranet.bb.com.br:9092/gecor/institucional/credito/pop_contab.php"
            target="_blank"><i class="material-icons">help</i></a>
          <a v-show="Funcionario.gerencial" class="waves-effect waves-light btn modal-trigger tooltipped"
            style="margin-left:16px" data-tooltip="Confirmação Titulo Razão" ref="modalRazao" href="#modalRazao"><i
              class="material-icons">lock</i></a>
              <a  class="waves-effect waves-light btn modal-trigger tooltipped" target="_blank" href="https://juridico.intranet.bb.com.br/paj/juridico/v2?app=acordoRAO"
            style="margin-left:16px" data-tooltip="Link registro de acordos" ><i
              class="material-icons">exit_to_app</i></a>
        </div>

        <div class="col s5 ">
          <a data-target="modalComplemento"
            class="right modal-trigger col s12 white-text font-3rem pointer border-dotted">Clique aqui para visualizar
            as informações complementares da súmula
            <i class="material-icons">subtitles</i>
          </a>
        </div>
      </div>
      <div class="row col s12" id="propostas">
        <div class="col s9">
          PROPOSTAS ENGLOBADAS
        </div>
        <div class="offset-s3">
          <a class="waves-effect waves-teal btn rigth btn-small" @click="selecionaTodos">Marcar Todas</a>
        </div>
      </div>
      <ul class="collapsible expandable" id="lista_propostas">
        <li class="col s12 " v-if="arrayPropostasPrazo.length > 0">
          <div class="collapsible-header white-text row col s12">
            <div class="col s8 header-collapse">
              <i class="material-icons">add</i>CONTABILIZAÇÕES À PRAZO
            </div>
            <div class="col s3">
              Nº DE OPERAÇÕES: {{ arrayPropostasPrazo.length }}
            </div>
          </div>
          <div class="collapsible-body">
            <div class="row col s12">
              <div class="col  white-text" style="width: 200px">Nº Operação /Nº Único /Status </div>
              <div class="col  white-text border-prop" style="width:50px">Pref. </div>
              <div class="col  white-text  border-prop" style="width:50px"> Sigla</div>
              <div class="col s2 white-text  border-prop" style="width:220px">Nome Operação</div>
              <div class="col  white-text  border-prop " style="width:100px">Titulo Razão</div>
              <div class="col  white-text  border-prop" style="width:150px">NPJ</div>
              <div class="col  white-text  border-prop" style="width:80px">Proposta</div>
              <div class="col s1 white-text  border-prop">Honorarios</div>
              <div class="col s1 white-text  border-prop">Custas</div>
              <div class="col s1 white-text  border-prop">IOF</div>
              <div class="col s1 white-text  border-prop">Valor Entrada</div>
              <div class="col s1 white-text hide  border-prop">GRD</div>
            </div>
            <HeaderPrazo v-for="t in arrayPropostasPrazo" :key="t.numeroUnico" @rateio="rateio" :verifica="verifica"
              :ref="t.numeroUnico" :t="t" :classe="classe" :demandas="protocolo" v-on:acordo="somaTotal" :k="t.k"
              :contaOpr="t.contaOpr" :prefixoOpr="t.prefixoOpr" :statusCheck="statusCheck"
              v-on:protocoloRepasse="abreProtocoloRepasse" v-on:alteraConta="alteraConta">
            </HeaderPrazo>
          </div>
        </li>
        <li class="col s12" v-if="arrayPropostasVista.length > 0">
          <div class="collapsible-header white-text row col s12">
            <div class="col s8 header-collapse">
              <i class="material-icons">add</i>CONTABILIZAÇÕES À VISTA
            </div>
            <div class="col s3">
              Nº DE OPERAÇÕES: {{ arrayPropostasVista.length }}
            </div>
          </div>
          <div class="collapsible-body">
            <div class="row col s12">
              <div class="col white-text" style="width: 200px">Nº Operação / Nº Único /Status </div>
              <div class="col  white-text border-prop" style="width:50px">Pref. </div>
              <div class="col  white-text  border-prop" style="width:50px"> Sigla</div>
              <div class="col s2 white-text  border-prop" style="width:220px">Nome Operação</div>
              <div class="col  white-text  border-prop " style="width:100px">Titulo Razão</div>
              <div class="col white-text  border-prop" style="width:140px">NPJ</div>
              <div class="col  white-text  border-prop" style="width:80px">Proposta</div>
              <div class="col s1 white-text  border-prop">Honorarios</div>
              <div class="col s1 white-text  border-prop">Custas</div>
              <div class="col s1 white-text  border-prop">IOF</div>
              <div class="col s1 white-text  border-prop">Valor Acordo</div>
              <div class="col s1 white-text hide  border-prop">GRD</div>
            </div>
            <Header v-for="t in arrayPropostasVista" :verifica="verifica" @rateio="rateio" :ref="t.numeroUnico"
              :key="t.numeroUnico" :t="t" :demandas="protocolo" :classe="classe" :k="t.k" v-on:acordo="somaTotal"
              :contaOpr="t.conta" :prefixoOpr="t.prefixo" :statusCheck="statusCheck"
              v-on:protocoloRepasse="abreProtocoloRepasse" v-on:alteraConta="alteraConta">
            </Header>
          </div>
        </li>
        <li class="col s12">
          <div class="collapsible-header white-text row col s12">
            <div class="col s8 header-collapse">
              <i class="material-icons">add</i>CONTAS VINCULADAS/ RESUMO VALORES TOTAIS/ OBSERVAÇÕES
            </div>
            <div class="col s3">
            </div>
          </div>

          <div class="row col s12 white black-text menuContabiliza collapsible-body">

            <div class=" col s6 conta-left">
              <div class="row black-text col s12">
                <a class=" black-text " v-on:click="adicionaConta('')"><i class="material-icons">add</i>Adicionar conta
                  vinculada</a>
              </div>
              <div class="row col s12 hide" ref="div_sisbb">
                <div class="row hide">
                  <span>Para realizar consultas SAS, é necessário login no servidor:</span>
                </div>
                <div class="input-field col s4 hide">
                  <input v-on:change="alterauser" :value="funci" placeholder="chave" id="chave" type="text" ref="user"
                    class="validate">
                  <label for="chave"></label>
                </div>
                <div class="input-field col s4 hide">
                  <input v-on:change="alterapwd" placeholder="senha sisbb" id="pwd" maxlength=8 ref="pwd"
                    type="password" class="validate">
                  <label for="pwd"></label>
                </div>
                <a class="waves-effect waves-light btn" v-on:click="atualizaSAS" ref="btn_sas">pesquisar</a>
              </div>
              <Conta v-for="t in contas" :key="t.alias" :open="open" :conta="t.conta" :pwd="pwd" :user="user"
                :agencia="t.agencia" :alias="t.alias" :id="t.id" v-on:sas="opensas" v-on:inexistente="contaInexistente"
                v-on:editar="editar" v-on:exclui="excluir" v-on:valor="somaValor" />
              <div class="row col s12 white-text" style="background: #0b3f5e; padding:0px">Cliente(s)


                <Cliente v-for="t in clientesSumula" :key="t.codigoCliente" :c="t" />
              </div>
            </div>
            <div class="row">
              <div class="col s6 hide">
                <ul class="">
                  <!-- <li v-for="t in tabs" :key="t.tituloRazao">{{t.tituloRazao}}</li> -->
                </ul>
              </div>
              <div class=" col s6 conta-right">

                <Totais :key="1" :valorTotal="VlTotal" :honorarios="VlHonorarios" :custas="VlCustas"
                  :valorFinal="VlFinal" :valorFormatado="valorFormatado" :valorFinalIof="valorFinalIof" :valorEntrada="VlEntrada" />
                <Upload :sumula="this.sumula" />
                <Obs :protocolo="sumula" />
              </div>
            </div>

          </div>
        </li>
      </ul>

      <a class="waves-effect waves-light btn modal-trigger hide" ref="modalAdiciona" href="#modalAdiciona"></a>


      <div id="modalComplemento" class="modal col s12 m12 l12 grey darken-4 flow-text">
        <div class="modal-content">
          <!-- <textarea class="texto-Complemento" readonly rows="10" id="txtRestricoes" cols="">
							
							</textarea>
 -->
          <div class="row" id="linhaBase">
            <div class="col s12 m12 grey lighten-5 fixed flow-text" id="fixo">
              <div class="card grey lighten-5 flow-text">
                <div class="card-content-fixed grey lighten-5 Black-text">
                  <div class="row col s10">
                    <span class="card-title" id="tituloCheckList">Informações Complementares</span>
                  </div>
                  <div class="row col s12 grey lighten-3 hide">
                    <span>Processos NPJ:</span>
                    <div class="col s12 font-16px grey lighten-2" id="listaProcessosNpj">
                      <ul class="collapsible" id="ullistaProcessosNpj"></ul>
                    </div>
                  </div>
                  <div class="row col s12 grey lighten-3 hide">
                    <span>Anotações Cadastrais:</span>
                    <div class="col s12 font-16px grey lighten-2" id="listaClientesRestricao">
                      <ul class="collapsible" id="ulListaClientesRestricoes"></ul>
                    </div>
                  </div>
                  <div class="row col s12 grey lighten-3">
                    <span>Observações Cláusulas não Padronizadas:</span>
                    <div class="col s12 font-16px grey lighten-2" id="">
                      <textarea class="texto-Complemento" readonly rows="10" id="NaoPadronizado" cols="">
                    </textarea>
                    </div>
                  </div>
                  <div class="row col s12 grey lighten-3">
                    <span>Justificativas de Atraso:</span>
                    <div class="col s12 font-16px grey lighten-2" id="">
                      <textarea class="texto-Complemento" readonly rows="10" id="Atraso" cols="">
                    </textarea>
                    </div>
                  </div>
                  <div class="row col s12 grey lighten-3">
                    <span>Benefícios do Negócio:</span>
                    <div class="col s12 font-16px grey lighten-2">
                      <textarea class="texto-Complemento" readonly rows="10" id="Beneficio" cols="">
                    </textarea>
                    </div>
                  </div>
                  <div class="row col s12 grey lighten-3">
                    <span>Riscos da não Efetivação:</span>
                    <div class="col s12 font-16px grey lighten-2" id="">
                      <textarea class="texto-Complemento" readonly rows="10" id="Risco" cols="">
                    </textarea>
                    </div>
                  </div>
                  <div class="row col s12 grey lighten-3">
                    <span>Demais Considerações</span>
                    <div class="col s12 font-16px grey lighten-2" id="">
                      <textarea class="texto-Complemento" readonly rows="10" id="Demais" cols="">
                    </textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col s12">
          <a href="#!" id="FecharmodalComplemento" class="modal-close waves-effect blue darken-3 btn"><i
              class="material-icons">close</i></a>
        </div>
      </div>
      <div id="modalAdiciona" class="modal modal-fixed-footer">
        <div class="modal-content">
          <h4>Adicionar Nova Conta</h4>
          <div class="input-field col s6">
            <input id="adicionapref" type="number"
              onKeyPress="console.log(this.value); if(this.value.length == 4 ) return false;" maxlength="4"
              ref="adicionaAgencia" class=" AdicionaAgencia">
            <label class="active" for="adicionapref">Prefixo</label>
          </div>
          <div class="input-field col s6">
            <input id="adicionaconta" ref="adicionaConta" type="number" pattern="/^-?\d+\.?\d*$/" class="AdicionaConta">
            <label class="active" for="adicionaconta">Conta Vinculada</label>
          </div>
        </div>
        <div class="modal-footer">
          <a class="modal-close waves-effect waves-green btn-flat" v-on:click="confirmaAdicionaConta()">Sim</a>
          <a class="modal-close waves-effect waves-green btn-flat" v-on:click="cancelaConfirmaConta()">Não</a>
        </div>
      </div>
      <ModalRazao />
      <div class="modal" id="modalChecklist">
        <div class="right">
          <a class="modal-close waves-effect waves-green btn-flat "><i class="material-icons">close</i></a>
        </div>
        <Check :sumula="sumula" :perguntas="perguntas" :oprs="oprs" :protocolo="protocolo"
          v-on:check="upadteStatusCheck" v-on:diligencia="protocoloDiligencias" />
        <div class="col row s12">
        </div>
        <br />
      </div>

    </div>
    <Cchonorarios :prefixo1="prfOpr" :conta1="contaOpr" :npj="npjOpr" :random="random" :numUnico="numUnicoConta"
      v-on:setAll="setAll" v-on:setUnique="setUnique" />
  </div>
</template>

<script>
import Pesquisa from "../services/pesquisa";
import Header from "./headerProposta.vue";
import HeaderPrazo from "./headerPropostaPrazo.vue";
import Timeline from "./timeline.vue";
import Demandas from "./demandas.vue";
import Conta from "./contaVinculada.vue";
import Totais from "./totais.vue";
import Upload from "./upload.vue";
import Cliente from "./cliente.vue";
import Check from "./checklist.vue";
import ModalRazao from "./modalConfirma.vue";
import Cchonorarios from "./cchonorarios.vue";
import M from "materialize-css";
import "material-design-icons/iconfont/material-icons.css";
import Obs from "./obs.vue";
export default {
  props: {
    sumula: String,
    sumulaStatus: String,
    funci: String
  },
  components: {
    Header,
    HeaderPrazo,
    Timeline,
    Demandas,
    Conta,
    Totais,
    Cliente,
    Obs,
    Upload,
    Check,
    Cchonorarios,
    ModalRazao
  },
  data() {
    return {
      g: false,
      arrayPropostasVista: [],
      arrayPropostasPrazo: [],
      classe: String,
      textos: Object,
      carregado: Boolean,
      clientes: String,
      cliente1: String,
      mci: String,
      clientesSumula: [],
      contas: [],
      contasVinculadas: [],
      contasSumula: [],
      valor: [],
      tabs: [],
      linhas: String,
      valorTotal: 0,
      VlHonorarios: 0,
      VlCustas: 0,
      VlTotal: 0,
      valores: [],
      VlFinal: 0,
      VlEntrada: 0,
      valorFormatado: String,
      pwd: "",
      user: "",
      open: Boolean,
      statusSumula: "",
      condicoes: [],
      excluidas: [],
      perguntas: [],
      oprs: [],
      protocolo: "",
      statusCheck: Boolean,
      loaded: false,
      prfOpr: Number,
      contaOpr: Number,
      npjOpr: Number,
      numUnicoConta: String,
      dataPosicao: String,
      SetProtocolo: String,
      random: String,
      load: true,
      aleatorio: String,
      DadosSumula: [],
      Funcionario: [],
      verifica: "0",
      valorAlcada:"",
      dataDesapcho:"",
      propostas:[],
      valorFinalIof:0
    };
  },

  async created() {
    this.open = false
    const dados = await Pesquisa.retornaSumula(this.sumula);
    const status = await Pesquisa.verificaToken()
    this.Funcionario = status.data
    this.funci = status.data.funci
    const sumula = dados.data[0];
    this.DadosSumula = sumula
    this.VlCustas = 0
    this.VlHonorarios = 0
    this.VlTotal = 0
    var A = false;
    var B = true;
    var C = false;
    var D = true;
    var i = 0;
   
    for await (let t of sumula.OperacoesGrupoSolucao.data.listaTabelaOcorrencia) {

      const o = this.DadosSumula.operacoes.data.listaTabelaOcorrencia.find(v => v.numeroUnicoOperacao == t.numeroUnicoOperacao)
      if (o) {
        t.Detalhes = o
        //var h = ""
        //h = (Object.keys(t))
        console.log({ ...t, ...o })
        this.DadosSumula.OperacoesGrupoSolucao.data.listaTabelaOcorrencia[i] = { ...t, ...o }
      }
      i++

    }
    this.condicoes = this.DadosSumula.condicoes.data.listaTabelaOcorrencia
    const dadosClientes = this.DadosSumula.ClientesSumula.data.listaOcorrenciaTabela;
    this.statusSumula = this.sumulaStatus
    const cliente = dadosClientes.find(k => k.indicadorResponsavelSolucao == "S")
    this.clientes = "";
    this.cliente1 = cliente.nomeCliente;
    this.mci = cliente.codigoCliente;
    this.propostas = this.DadosSumula.propostas.data.listaTabelaOcorrencia
    const condicoes = this.DadosSumula.condicoes.data.listaTabelaOcorrencia
    for await (let cl of dadosClientes) {
      this.clientes += ` ${cl.nomeCliente}<br> `;
    }
    const arrayCondicoes = [];

    const nomeCliente = document.querySelector("#NomeClientes");
    nomeCliente.dataset.tooltip = this.clientes;
    nomeCliente.removeAttribute("hidden");
    this.clientesSumula = this.DadosSumula.ClientesSumula.data.listaOcorrenciaTabela.filter(l => l.codigoTipoClassificacaoInterveniente == '1');

    
    for await (let c of this.DadosSumula.OperacoesGrupoSolucao.data.listaTabelaOcorrencia) {
      if (c.indicadorOperacaoSelecionadoRenegociacao == "N") {
        continue
      }
      const numeroUnico = c.numeroUnicoOperacao;
      const numGrupo = c.numeroSequencialGrupoSolucao
      const nrGrupo = this.DadosSumula.OperacoesGrupoSolucao.data.listaTabelaOcorrencia.find(
        (q) => q.numeroUnicoOperacao.toString() == numeroUnico.toString()
      );
      const numOpr = c.numeroOperacaoOrigem;
      const prf = nrGrupo.numeroDependenciaSistemaOrigem;
      const sigla = nrGrupo.siglaSistemaOrigemOperacao;
      const operacao = nrGrupo.textoProdutoModalidade;
      const tituloRazao = "teste";
      const honorarios = 0;
      const custas = 0;
      const valorGRD = "teste ";
      const empreendimento = c.numeroSequencialEmpreendimento
      const subContrato = c.numeroSubcontratoOperacao
      const codigoProduto = c.codigoProduto
      const codigoModalidade = c.codigoModalidade
      const mci = c.codigoCliente
      const valorIof  = this.propostas.find(o=> o.numeroSequencialGrupoSolucao ==numGrupo )
     
      const npj = this.DadosSumula.NPJ.data.listaTabelaOcorrencia.find(
        (p) => p.numeroUnicoOperacao == numeroUnico
      );
      var numNpj = " ";

      if (npj) {
        numNpj = npj.numeroProcessoJuridico ? npj.numeroProcessoJuridico : "Não Ajuizado";
      } else {
        numNpj = "Não Ajuizado";
      }
      const condicao = this.DadosSumula.condicoes.data.listaTabelaOcorrencia.find((o) => o.numeroSequencialGrupoSolucao == c.numeroSequencialGrupoSolucao);
      console.log("******condicao", condicao, c.numeroSequencialGrupoSolucao)
      if (condicao.quantidadeParcelaAmortizacao == 1 || condicao.quantidadeParcelaAmortizacao == 0) {
        const valorAcordo = c.valorPropostoOperacaoCredito != "0.00" ? c.valorPropostoOperacaoCredito : c.valorParticipacaoOperacaoGrupo;
        A = A ? false : true;
        B = B ? false : true;
        if(!this.arrayPropostasVista.find(w=> w.numeroUnico == numeroUnico)){

        
        this.arrayPropostasVista.push({
          numeroUnico,
          numOpr,
          prf,
          sigla,
          operacao,
          tituloRazao,
          numNpj,
          honorarios,
          custas,
          valorAcordo,
          valorGRD,
          A,
          B,
          protocolo: this.sumula,
          proposta: numGrupo,
          empreendimento,
          subContrato,
          codigoProduto,
          codigoModalidade,
          mci,
          mciOpr: mci,
          valorIof: (valorIof.valorImpostoSobreOprFinanceiras.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })),
          tipIof: valorIof.codigoTipoImpostoSobreOprFinanceiras

        });
        }
      } else {
        var valorAcordo = 0;
        if (!arrayCondicoes.includes(p => (p.numGrupo == numGrupo))) {
          arrayCondicoes.push({ numGrupo });
          const condicao = condicoes.find(k => (k.numeroSequencialGrupoSolucao == numGrupo));
          valorAcordo = condicao.valorEntradaGrupo != "0.00" ? condicao.valorEntradaGrupo : 0;
        } else {
          valorAcordo = 0
        }
        C = C ? false : true;
        D = D ? false : true;
         if(!this.arrayPropostasPrazo.find(w=> w.numeroUnico == numeroUnico)){
        this.arrayPropostasPrazo.push({
          numeroUnico,
          numOpr,
          prf,
          sigla,
          operacao,
          tituloRazao,
          numNpj,
          honorarios,
          custas,
          valorAcordo,
          valorGRD,
          A: C,
          B: D,
          protocolo: this.sumula,
          proposta: numGrupo,
          empreendimento,
          subContrato,
          codigoProduto,
          codigoModalidade,
          mci,
          mciOpr: mci,
          page: "",
          valorIof: (valorIof.valorImpostoSobreOprFinanceiras.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })),
          tipIof: valorIof.codigoTipoImpostoSobreOprFinanceiras

        });
        }
      }
    }
    this.carregado = true;
    var elem = document.querySelector('.collapsible.expandable');
    M.Collapsible.init(elem, { accordion: false });


  },
  watch: {
    carregado: async function complementos() {
      const r = await Pesquisa.retornaComplementos(this.sumula);
      const resposta = r.data;
      const textos = {};
      var datas = null;
      var dados = resposta.Condicoes.data;
      var txtJustificativaAtraso = await JustificativaAtraso(dados);
      var txtBeneficioNegocio = await BeneficioNegocio(dados);
      this.loaded = true;
      await verificaAcessoBens();
      const DadosMcis = resposta.MCI;
      await verificaErroMci(DadosMcis);
      var txtRiscoCancelamento = await RiscoCancelamento(dados);
      var txtObservacao = await Observacao(dados);
       if(this.sumulaStatus ==""){
        const mciPesquisa = this.clientesSumula.find(o=> o.indicadorResponsavelSolucao == "S")
        const dadosSumula = await Pesquisa.pesquisa("mci", mciPesquisa.codigoCliente).then(async (retorno) => {
          console.log("retorno data",retorno.data)
          const p = retorno.data[0].data.listaOcorrenciaTabela
          const sumulaSplit = this.sumula.split('/')
          const sumulaPesquisa = `${sumulaSplit[0]}${sumulaSplit[2]}`
          return p.find(o => o.codigoDossieRecuperacaoCredito == sumulaPesquisa)
        })
        this.statusSumula = dadosSumula.textoDescricaoEstadoDossie
    }
      datas = resposta.Despacho.Despacho.timestampAtualizacaoTextoResumo;
      // $("#ValorAlcada").innerHTML = await formataDinheiro(
      //   parseFloat(resposta.DadosCriacao.DadosCriacao.data.valorTotalSolucao)
      // );
      const sumula = this.sumula.split("/")
      const retorno = await Pesquisa.getDadosSolucao(sumula[0]+""+sumula[2])
      const retornaInf = await Pesquisa.getInfSumula(sumula[0]+""+sumula[2])
    

      this.dataPosicao = retornaInf.data.data.timestampAtualizacao.dataUltimoAtualizacao
      // this.formataData(this.DadosSumula.OperacoesGrupoSolucao.data.listaTabelaOcorrencia[0].timestampAtualizacao).toLocaleDateString()
      this.valorAlcada = await formataDinheiro(
        parseFloat(retorno.data.data.valorTotalSolucao)
      );
      
      this.dataDespacho = new Date(retorno.data.data.timestampAtualizacao.substring(0,22).replace(/-/g,"/").replace(/\./g,":")).toLocaleDateString("pt-BR")
      $("#tx_enquadramento").innerHTML = "<span    class='realceSpan'>ENQUADRAMENTO: </span>" + resposta.Condicoes.data.textoEnquadramentoRegulamentar;
      $("#tx_enquadramento_tooltip").innerHTML = resposta.Condicoes.data.textoEnquadramentoRegulamentar;
      $("#tx_comite").innerHTML = "<span class='realceSpan'>ALÇADA: </span> " + resposta.Condicoes.data.textoCompetenciaAlcada;
      $("#tx_comite_tooltip").innerHTML =
        resposta.Condicoes.data.textoCompetenciaAlcada;
      $("#icone_clausula_padrao").innerHTML =
        resposta.Condicoes.data.indicadorClausulaForaPadrao == "S" ? `<i class="material-icons pointer">wrap_text</i>` : "";
      if (resposta.Condicoes.data.indicadorClausulaForaPadrao == "N") {
        $("#NaoPadronizado").parentNode.parentNode.classList.add("hide");
      } else {
        $("#NaoPadronizado").parentNode.parentNode.classList.remove("hide");
      }
      var txtForaPadrao = ForaPadrao(dados);
      $("#Atraso").innerHTML = txtJustificativaAtraso;
      $("#Beneficio").innerHTML = txtBeneficioNegocio;
      $("#Risco").innerHTML = txtRiscoCancelamento;
      $("#Demais").innerHTML = txtObservacao;
      $("#NaoPadronizado").value = txtForaPadrao;
      comparaDatas([datas]);
      function $(i) {
        return document.querySelector(i);
      }
      async function formataDinheiro(n) {
        return (
          "R$ " +
          n.toFixed(2)
            .replace(".", ",")
            .replace(/(\d)(?=(\d{3})+,)/g, "$1.")
        );
      }
      async function JustificativaAtraso(a) {
        textos.justificativaAtraso = "";
        for (var b = 0; b < a.quantidadeJustificativaAtraso; b++) {
          if ("" === a.textoJustificativaAtrasoTabela[b].textoJustificativaGrupo) {
            a.textoJustificativaAtrasoTabela[b].textoJustificativaGrupo = " ";
          }
          textos.justificativaAtraso += a.textoJustificativaAtrasoTabela[b].textoJustificativaGrupo;
        }
        return textos.justificativaAtraso;
      }
      async function BeneficioNegocio(a) {
        textos.beneficioNegocio = "";
        for (var b = 0; b < a.quantidadeBeneficioNegocio; b++) {
          if ("" === a.textoBeneficioNegocioTabela[b].textoBeneficioGrupo) {
            a.textoBeneficioNegocioTabela[b].textoBeneficioGrupo = " ";
          }
          textos.beneficioNegocio = textos.beneficioNegocio + a.textoBeneficioNegocioTabela[b].textoBeneficioGrupo;
        }
        return textos.beneficioNegocio;
      }

      async function RiscoCancelamento(a) {
        textos.riscoNaoEfetivacao = "";
        for (var b = 0; b < a.quantidadeRiscoCancelamento; b++) {
          if ("" === a.textoRiscoCancelamentoTabela[b].textoRiscoGrupo) {
            a.textoRiscoCancelamentoTabela[b].textoRiscoGrupo = " ";
          }
          textos.riscoNaoEfetivacao = textos.riscoNaoEfetivacao +
            a.textoRiscoCancelamentoTabela[b].textoRiscoGrupo;
        }
        return textos.riscoNaoEfetivacao;
      }
      async function Observacao(a) {
        textos.demaisConsideracoes = "";
        for (var b = 0; b < a.quantidadeObservacao; b++) {
          if ("" === a.textoObservacaoTabela[b].textoObservacaoGrupo) {
            a.textoObservacaoTabela[b].textoObservacaoGrupo = " ";
          }
          textos.demaisConsideracoes = textos.demaisConsideracoes + a.textoObservacaoTabela[b].textoObservacaoGrupo;
        }
        return textos.demaisConsideracoes;
      }
      async function ForaPadrao(a) {
        textos.textClausulasNaoPadronizadas = "";
        for (var b = 0; b < a.quantidadeForaPadrao; b++) {
          if ("" === a.textoForaPadraoTabela[b].textoForaPadraoGrupo) {
            a.textoForaPadraoTabela[b].textoForaPadraoGrupo = " ";
          }
          textos.textClausulasNaoPadronizadas = textos.textClausulasNaoPadronizadas + a.textoForaPadraoTabela[b].textoForaPadraoGrupo;
        }
        return textos.textClausulasNaoPadronizadas;
      }
      async function verificaAcessoBens() {
        return true;
      }

      async function verificaErroMci(mci) {
        for (const cliente of mci) {
          if (cliente.ClientesSumula) {
            this.erroObs(cliente.ClientesSumula.messages[0].text + "-" + cliente.DetalhesCliente, "erro");
          }
        }
      }

      async function comparaDatas() {
        // var DataMaisRecente = new Date("2015/08/26 15:54:09");
        // var despachos = "";
        // var dataFormatada = " ";
        // var data = "";
        // var DataDespacho = " ";

        // for (var data1 of datas) {
        //   var objFunci = await Pesquisa.recuperaDadosFunciVotante(
        //     data1.codigoUsuarioVotante
        //   );
        //   despachos +=
        //     data1.codigoUsuarioVotante + "-" + objFunci.data.nome + "<br> ";
        //   data = data1.timestampVotacaoDespacho;
        //   dataFormatada = data.substring(0, 10) + " " + data.substring(11, 13) + ":" + data.substring(14, 16) + ":" + data.substring(17, 19);
        //   DataDespacho = new Date(dataFormatada);
        //   if (DataDespacho.getTime() > DataMaisRecente.getTime()) {
        //     DataMaisRecente = DataDespacho;
        //   }
        // }
        //console.log(DataMaisRecente, dataDespacho)
        //$("#datasDespachos").innerHTML = DataMaisRecente.toLocaleDateString();
        // $("#divDespacho").dataset.tooltip = "Funcis votantes: <br>" + despachos;
        $("#divDespacho").classList.remove("hide");
        $(".loader").classList.add("hide");
        //$("#dataPosicao").innerHTML = this.dataPosicao?this.dataPosicao:"";
      }


      this.carregaContas()
      this.getContas()
    },
    setProtocolo: function () {

    }
  },
  methods: {
    erroObs: function (e, t) {
      var fechar = "</span><a class='btn-flat toast-action amber-text accent-2-text' onclick='fecharToast()'>Fechar</a>"
      if (!t) {
        t = ""
      }
      M.toast({ html: e + fechar, classes: t, displayLength: 3000, activationPercent: 0.5 });
    },
    formataData: function (timestamp) {
      let data = timestamp
      let dataFormatada = data.substring(0, 10) + " " + data.substring(11, 13) + ":" + data.substring(14, 16) + ":" + data.substring(17, 19);
      return new Date(dataFormatada);
      // return dataFormatada
      // if (DataDespacho.getTime() > DataMaisRecente.getTime()) {
      //   DataMaisRecente = DataDespacho;
      // }
    },
    adicionaConta: function () {
      if (this.protocolo != "" && this.protocolo != null && this.protocolo != undefined) {

        this.$refs.modalAdiciona.click()
      } else {
        this.erroObs("Atenção, não há protocolo vinculado a essa súmula, vincule um antes de prosseguir", "")
      }

    }, cancelaConfirmaConta() {
      this.$refs.adicionaAgencia.value = "";
      this.$refs.adicionaConta.value = "";
    },
    confirmaAdicionaConta: function () {
      const agencia = this.$refs.adicionaAgencia.value;
      const conta = this.$refs.adicionaConta.value;
      const protocolo = this.protocolo // document.getElementById('numSumula').innerText;
      const sumula = document.getElementById('numSumula').innerText;
      this.adicionar({ conta, agencia, protocolo, sumula });
    },
    verificaExcluidas: async function () {
      const psq = await Pesquisa.verificaExcluido(this.sumula, this.protocolo);
      const gecor = await Pesquisa.getGecor();
      const protocolo = document.getElementById('numSumula').innerText
      this.excluidas = psq.data;
      this.contasVinculadas = []
      this.contas = []

      for await (let c of this.condicoes) {
        const ag = c.codigoPrefixoAgenciaDebito;
        const cc = c.numeroContaCorrenteDebito;
        if (gecor.data.find(l => (l.prf.toString() == ag.toString()))) {
          this.contasSumula.push({ agencia: ag, conta: cc })
          if (!this.contas.find(h => h.agencia == ag && h.conta == cc) && (ag != "0" && cc != "0")) {
            if (!this.excluidas.find(p => (p.protocolo == protocolo && p.agencia == ag && p.conta == cc))) {
              this.contasVinculadas.push({ agencia: ag, conta: cc });
            }
          }
        }
      }
      await this.verificaContasVinculadas()
    },
    contaInexistente: async function (id) {
      M.toast({ html: 'Atenção, conta inexistente na base, verifique o número e tente novamente...' })
      this.excluir(id)
    },
    excluir: async function (id) {
      const protocolo = this.protocolo //document.getElementById('numSumula').innerText;
      const sumula = document.getElementById('numSumula').innerText;
      await Pesquisa.excluiConta(id);
      const c = await Pesquisa.recuperaConta(protocolo, sumula);
      const cc = c.data;
      this.contas = [];
      await this.verificaExcluidas();
      for await (let t of cc) {
        const alias = Math.random().toString();
        if (!this.contas.find(l => l.conta.toString() == t.conta.toString() && l.agencia.toString() == t.agencia.toString())) {

          this.contas.push({ conta: t.conta.toString(), agencia: t.agencia.toString(), alias, id: t.id.toString() })
        }
        // this.contas.push({conta:contas.conta.toString(), agencia: contas.agencia.toString(),id: contas.id.toString(), alias:alias});
      }
      if (this.contas.length == 0) {
        this.valorTotal = 0;
      }
      // const totalFinal = (this.valorTotal - ((this.VlHonorarios) + (this.VlCustas) + (this.VlTotal)))
      // this.valorFormatado =  this.formataDinheiro(totalFinal)
      // this.VlFinal = totalFinal
      const totalFinal = (this.valorTotal - ((this.VlHonorarios) + (this.VlCustas) + (this.VlTotal)));
      this.valorFormatado = this.formataDinheiro(totalFinal);
      this.VlFinal = totalFinal;
    },
    adicionar: async function (conta) {
      const valida = this.contas.filter(o => o.conta == conta.conta && o.agencia == conta.agencia);
      if (valida.length > 0) {
        M.toast({ html: 'Conta já cadastrada para essa Súmula/Protocolo' });
      } else {
        await Pesquisa.adicionaConta(conta, this.protocolo)
        const c = await Pesquisa.recuperaConta(this.protocolo, conta.sumula);
        const cc = c.data;
        this.contas = [];
        await this.verificaExcluidas();
        for await (let contas of cc) {
          const alias = Math.random().toString()
          this.contas.push({ conta: contas.conta.toString(), agencia: contas.agencia.toString(), id: contas.id.toString(), alias: alias })
        }
      }
    },
    editar: async function (conta) {
      const valida = this.contas.filter(o => o.conta == conta.conta && o.agencia == conta.agencia)
      if (valida.length > 0) {
        M.toast({ html: 'Conta já cadastrada para essa Súmula/Protocolo' })
      } else {
        const protocolo = document.getElementById('numSumula').innerText
        const sumula = document.getElementById('numSumula').innerText
        await Pesquisa.editaConta(conta.conta, conta.agencia, conta.id, this.protocolo)
        const c = await Pesquisa.recuperaConta(protocolo, sumula)
        const cc = c.data
        this.contas = []
        await this.verificaExcluidas()
        for await (let contas of cc) {
          const alias = Math.random().toString()
          this.contas.push({ conta: contas.conta.toString(), agencia: contas.agencia.toString(), id: contas.id.toString(), alias, valor: 0 })
        }
      }
    },
    somaValor: async function (v) {
      for await (let d of this.contas) {
        if (d.conta == v.conta && d.agencia == v.agencia) {
          d.valor = v.valor;
          d.tituloRazao = v.tituloRazao
        }
      }
      this.valor = []
      for await (let j of this.contas) {
        if (this.valor.includes(l => (l.tituloRazao == j.tituloRazao))) {
          const g = this.valor.findIndex(l => (l.tituloRazao == j.tituloRazao))
          this.valor[g].valor += j.valor
        } else {
          this.valor.push({ tituloRazao: j.tituloRazao, valor: j.valor })
        }
      }
      this.tabs = []
      var somavalores = 0
      for await (let h of this.valor) {
        somavalores += parseFloat(h.valor)
        if (!this.tabs.includes(k => k.tituloRazao === h.tituloRazao)) {
          this.tabs.push({ tituloRazao: h.tituloRazao })
          this.linhas += `<li v-for="t in this.tabs" :key="t.tituloRazao" class="tab col s3"><a :href="${h.tituloRazao}">${h.tituloRazao}</a></li>`
        }
      }
      this.valorTotal = somavalores;
      const totalFinal = (this.valorTotal - ((this.VlHonorarios) + (this.VlCustas) + (this.VlTotal) + (this.VlEntrada)));
      this.valorFormatado = this.formataDinheiro(totalFinal);
      this.VlFinal = totalFinal;
    },
    somaTotal: async function (a) {
      console.log(a)
      this.VlHonorarios = 0;
      this.VlCustas = 0;
      this.VlTotal = 0;
      this.VlEntrada = 0;
      this.valores = this.valores.filter(k => k.numUnico != a.numUnico);
      this.oprs = [];
      
      const l = this.arrayPropostasVista.find(j => j.numeroUnico == a.numUnico) ? this.arrayPropostasVista.find(j => j.numeroUnico == a.numUnico) : this.arrayPropostasPrazo.find(j => j.numeroUnico == a.numUnico)
      if (a.status == 'checked' || a.status == true) {

        this.valores.push(a);
      }
      l.status = a.status
      this.valores.map(j => {
        this.oprs.push(j.numUnico);
        this.VlHonorarios += parseFloat(j.honorarios);
        this.VlCustas += parseFloat(j.custas);
        this.valorFinalIof +=j.valorIof
        if (j.tip == 1) {
          this.VlTotal += parseFloat(j.acordo);
        } else {
          this.VlEntrada += parseFloat(j.acordo);
        }
      })
      const totais = this.VlHonorarios + this.VlCustas + this.VlTotal + this.VlEntrada;
      const totalFinal = (parseFloat(this.valorTotal) - parseFloat(totais));

      this.valorFormatado = this.formataDinheiro(totalFinal);

      this.VlFinal = totalFinal;
    },
    formataDinheiro: function (n) {
      return (
        "R$ " + n.toFixed(2).replace(".", ",").replace(/(\d)(?=(\d{3})+,)/g, "$1.")
      );
    },
    alterapwd: async function () {
      const pwd = this.$refs.pwd.value
      if (typeof (pwd) == "string") {
        this.pwd = pwd
        this.open = true;
      }
    },
    alterauser: async function () {
      const user = this.$refs.user.value;
      if (user.length > 7 && user.length < 9) {

        if (typeof (user) == "string") {
          this.user = user
        }
      }
    },
    opensas: async function () {
      if (this.$refs.div_sisbb.classList.contains('hide')) {
        this.$refs.div_sisbb.classList.remove('hide')
        //M.toast({html: 'Será necessário consulta ao SAS, por favor preencha os dados abaixo'})
      } else {
        this.open = true;
        const ccs = this.contas;
        this.contas = [];
        this.contas = ccs;
        this.atualizaSAS()
      }
    }, atualizaSAS: async function () {
      //mci=204015511
      const pwd = this.$refs.pwd.value;
      const user = this.$refs.user.value;
      // if(user == undefined || user == null){
      //       M.toast({html: 'Preecha usuário e senha antes de prosseguir'})
      //    return false;
      // }
      // if(pwd == undefined || pwd == null){
      //       M.toast({html: 'Preecha usuário e senha antes de prosseguir'})
      //    return false;
      // }
      // if(pwd=="" || user==""){
      //       M.toast({html: 'Preecha usuário e senha antes de prosseguir'})
      //    return false;
      // }
      // if(!pwd || !user||pwd=="" || user==""|| user.length !=8 || pwd.length != 8){
      //    M.toast({html: 'Preecha usuário e senha antes de prosseguir'})
      //    return false;
      // }
      this.user = user
      this.pwd = pwd
      this.contas = []
      M.toast({ html: 'Atenção, a pesquisa  pode demorar alguns segundos, por favor aguarde' })
      const contasBd = await Pesquisa.recuperaConta(this.protocolo, this.sumula)
      contasBd.data.map(t => {
        const alias = Math.random().toString();
        if (!this.contas.find(l => l.conta.toString() == t.conta.toString() && l.agencia.toString() == t.agencia.toString())) {

          this.contas.push({ conta: t.conta.toString(), agencia: t.agencia.toString(), alias, id: t.id.toString() })
        }
        // this.contas.push({conta:t.conta.toString(),agencia:t.agencia.toString(), alias, id:t.id.toString()})
      })
      if (this.contas.length == 0) {
        this.valorTotal = 0
        const totalFinal = (this.valorTotal - ((this.VlHonorarios) + (this.VlCustas) + (this.VlTotal)))
        this.valorFormatado = this.formataDinheiro(totalFinal)
        this.VlFinal = totalFinal
      }
    }, getGecor: async function (prf) {
      const g = await Pesquisa.getGecor();
      if (g.data.find(l => (l.prf == prf))) {
        return true
      } else {
        return false
      }
    },
    verificaContasVinculadas: async function () {
      const protocolo = this.protocolo //document.getElementById('numSumula').innerText
      const sumula = this.sumula //document.getElementById('numSumula').innerText
      const conta = []
      const g = await Pesquisa.getGecor();
      const e = await Pesquisa.verificaExcluido(this.sumula, this.protocolo)
      const c = await Pesquisa.recuperaConta(protocolo, sumula)
      var array = this.contasVinculadas
      // if(c.data.length > 0){
      for await (let f of array) {
        if (conta.find(h => h.agencia == f.agencia && h.conta == f.conta)) {
          continue
        }
        if (g.data.find(m => m.prf == f.agencia)) {
          if (!this.contasSumula.find(l => l.agencia == f.agencia && l.conta.toString() == f.conta.toString())) {
            this.contasSumula.push({ agencia: f.agencia, conta: f.conta })
          }
          if (!e.data.find(l => l.agencia == f.agencia && l.conta.toString() == f.conta.toString())) {
            if (!c.data.find(l => l.agencia == f.agencia && l.conta.toString() == f.conta.toString())) {
              conta.push({ agencia: f.agencia, conta: f.conta, protocolo: this.protocolo, sumula: this.sumula })
            }
          }
        }
      }
      // }
      conta.map(k => {
        this.adicionar(k)
      })
      this.somaTotal()
    }, atualizaOperacoes: async function (o) {
      const arrayOprs = [].concat(this.arrayPropostasVista, this.arrayPropostasPrazo)
      var arrayVista = []
      var arrayPrazo = []
      arrayVista = this.arrayPropostasVista
      arrayPrazo = this.arrayPropostasPrazo
      this.arrayPropostasVista = []
      this.arrayPropostasPrazo = []
      for (let r of arrayOprs) {
        if (!o.find(l => l.NR_UNICO == r.numeroUnico)) {
          await Pesquisa.atualizaStatus(r.numeroUnico, this.sumula, false)
        }
      }
      this.arrayPropostasVista = arrayVista
      this.arrayPropostasPrazo = arrayPrazo
    },
    montaCheck: async function () {
      this.perguntas = []
      const r = await Pesquisa.retornaPerguntas(this.sumula, 1, this.protocolo)
      this.perguntas = r.data
    },
    setDemandas: async function (d) {
      this.protocolo = d.dem
      this.setProtocolo = d.dem
      // this.vistaArray = this.arrayPropostasVista
      // this.prazoArray = this.arrayPropostasPrazo
      // this.arrayPropostasVista = []
      // this.arrayPropostasPrazo = []
      this.loaded = false
      // window.setTimeout(() => {

      //   this.vistaArray.map(o=>{
      //     this.arrayPropostasVista.push(o)
      //   })
      //   this.prazoArray.map(o=>{
      //     this.arrayPropostasPrazo.push(o)
      //   })
      // }, 200);
      await this.carregaContas()
      await this.getContas()
      await this.montaCheck()
      this.verifica = Math.random().toString()
      this.loaded = true
    },
    forceRerender: function () {
      this.renderComponent = false;
      //console.log("force render")
      const vista = this.arrayPropostasVista
      const prazo = this.arrayPropostasPrazo
      this.arrayPropostasVista = []
      this.arrayPropostasPrazo = []
      this.arrayPropostasVista = vista
      this.arrayPropostasPrazo = prazo
      this.$nextTick(() => {
        // add my-component component in DOM
        this.renderComponent = true;
      });
    },
    upadteStatusCheck: function (s) {
      //console.log('update status check')
      this.statusCheck = s
      this.aleatorio = Math.random()
    },
    abreProtocoloRepasse: function (r) {
      console.log("reapsse contabiliza", r)

    },
    alteraConta: function (d) {
      const arrayTotal = [...this.arrayPropostasVista, ...this.arrayPropostasPrazo]
      this.numUnicoConta = d.numUnico
      const o = arrayTotal.find(i => i.numeroUnico == this.numUnicoConta)
      this.prfOpr = d.prefixo
      this.contaOpr = d.conta
      this.npjOpr = o.npj
      this.random = Math.random().toString()

    },
    selecionaTodos: async function(){
        document.querySelectorAll("input[type='checkbox']").forEach(o=>{o.click()})
    },
    carregaContas: async function () {
      const protocolo = this.protocolo // document.getElementById('numSumula').innerText
      const sumula = document.getElementById('numSumula').innerText
      this.contas = []
      const contasBd = await Pesquisa.recuperaConta(protocolo, sumula)
      this.contasVinculadas = []
      const psq = await Pesquisa.verificaExcluido(this.sumula, this.protocolo);
      const gecor = await Pesquisa.getGecor();
      this.excluidas = psq.data;
      for await (let c of this.condicoes) {
        const ag = c.codigoPrefixoAgenciaDebito;
        const cc = c.numeroContaCorrenteDebito;
        if (gecor.data.find(l => (l.prf.toString() == ag.toString()))) {
          this.contasSumula.push({ agencia: ag, conta: cc })
          if (!this.contas.find(h => h.agencia == ag && h.conta == cc) && (ag != "0" && cc != "0")) {
            if (!this.excluidas.find(p => (p.protocolo == protocolo && p.agencia == ag && p.conta == cc))) {
              if (!this.contasVinculadas.find(j => j.agencia == ag && j.conta == cc)) {
                this.contasVinculadas.push({ agencia: ag, conta: cc, protocolo: this.protocolo, sumula: this.sumula });
              }
            }
          }
        }
      }
      for (let p of this.contasVinculadas) {
        if (!contasBd.data.find(k => k.agencia == p.agencia && k.conta == p.conta)) {
          await this.adicionar(p)
        }
      }
      const contasNew = await Pesquisa.recuperaConta(protocolo, sumula)
      contasNew.data.map(t => {
        const alias = Math.random().toString()
        if (!this.contas.find(l => l.conta.toString() == t.conta.toString() && l.agencia.toString() == t.agencia.toString())) {
          this.contas.push({ conta: t.conta.toString(), agencia: t.agencia.toString(), alias, id: t.id.toString() })
        }
      })
      if (this.contas.length == 0) {
        this.valorTotal = 0
      }

      this.getContas()
    },
    setAll: async function (a) {
      const arrayTotal = [...this.arrayPropostasVista, ...this.arrayPropostasPrazo]
      for (let g of arrayTotal) {
        //console.log(g)
        if (g.numNpj != "Não Ajuizado" && g.honorarios > 0) {
          const r = await Pesquisa.setContaNpj(g.numNpj, g.numeroUnico, a.conta, a.prefixo, g.honorarios, this.protocolo, this.sumula, g.custas, g.rateio)
          this.erroObs("operação: " + g.numeroUnico + " - " + r.data.msg, "")
        }
      }
      this.getContas()
    },
    setUnique: async function (a) {
      const arrayTotal = [...this.arrayPropostasVista, ...this.arrayPropostasPrazo]
      const g = arrayTotal.find(k => k.numeroUnico == a.numUnico)
      if (g.numNpj != "Não Ajuizado" && g.honorarios > 0) {
        const r = await Pesquisa.setContaNpj(g.numNpj, g.numeroUnico, a.conta, a.prefixo, g.honorarios, this.protocolo, this.sumula, g.custas, g.rateio)
        this.erroObs("operação: " + g.numeroUnico + " - " + r.data.msg, "")
      }
      this.getContas()
    },
    getContas: async function () {
      // const arrayTotal = [...this.arrayPropostasVista,...this.arrayPropostasPrazo]

      for await (const g of this.arrayPropostasVista) {
        //console.log(g)
        if (g.numNpj != "Não Ajuizado" && g.honorarios > 0) {
          const r = await Pesquisa.getContaNpj(g.numNpj, g.numeroUnico, this.protocolo, this.sumula)
          //console.log(r)
          g.contaOpr = r.data.conta
          g.prefixoOpr = r.data.prf
          //console.log(this.$refs[g.numeroUnico])
          const v = this.$refs[g.numeroUnico]
          v[0].contaOpr = g.contaOpr
          v[0].prefixoOpr = g.prefixoOpr

        }
      }
      for await (const g of this.arrayPropostasPrazo) {
        //console.log(g)
        if (g.numNpj != "Não Ajuizado" && g.honorarios > 0) {
          const r = await Pesquisa.getContaNpj(g.numNpj, g.numeroUnico, this.protocolo, this.sumula)
          g.contaOpr = r.data.conta
          g.prefixoOpr = r.data.prf
          const v = this.$refs[g.numeroUnico]
          v[0].contaOpr = g.contaOpr
          v[0].prefixoOpr = g.prefixoOpr
        }
      }
    },
    protocoloDiligencias: async function () {
      const allOprs = [...this.arrayPropostasVista, ...this.arrayPropostasPrazo]
      const activeOprs = allOprs.filter(i => i.status == "checked" || i.status == true && i.dilig == false)
      const npjOprs = activeOprs.filter(i => i.numNpj != "" && i.numNpj != null && i.numNpj != undefined && i.numNpj != "Não Ajuizado")
      const honOprs = npjOprs.filter(i => i.honorarios > 0 && i.dilig == false)
      const cstOpr = npjOprs.filter(i => i.custas > 0 && i.dilig == false || !i.dilig)
      const itens = [...cstOpr, ...honOprs]

      // if(itens.length == 0){
      //   let e = "Não existem pendências de repasse de honorários ou custas"
      //     M.toast({ html: e, classes: "", displayLength: 6000, activationPercent: 0.5 });
      // }
      const nAtribuidas = itens.filter(l => (l.contaOpr == "" && l.contaOpr == undefined && l.prefixoOpr == "" && l.prefixoOpr == undefined))
      if (nAtribuidas.length > 0) {
        var e = "Atenção, existem operações sem conta ou agencia para débito de repasse de valores, por favor, verifique e tente novamente"
        M.toast({ html: e, classes: "", displayLength: 6000, activationPercent: 0.5 });
      } else {
        const r = await Pesquisa.openDilig(itens, this.protocolo, this.sumula)
        M.toast({ html: r.data.msg, classes: "", displayLength: 6000, activationPercent: 0.5 });
        for (let g of itens) {
          const h = {}
          h.numeroUnico = g.numeroUnico
          this.putDilig(h)
        }
        this.atualiza = Math.random()
      }
      this.verifica = Math.random().toString()
    },
    putDilig: async function (l) {
      const nUnico = l.numeroUnico
      if (this.arrayPropostasVista.find(i => i.numeroUnico == nUnico)) {
        var r = this.arrayPropostasVista.find(i => i.numeroUnico == nUnico)
        r.dilig = true
      } else {
        const r = this.arrayPropostasPrazo.find(i => i.numeroUnico == nUnico)
        r.dilig = true
      }

    },
    verificaVinculo: async function (array) {
      var q = ""
      for await (let i of array) {
        if (q != "") {
          q += " or "
        }
        q += " NR_UNCO = " + i.numeroUnico
      }
      const f = await Pesquisa.getVinculosOpr(array);

      return f.data
    },
    rateio: async function (a) {
      const h = a.opr
      const r = a.rateio
      const tip = a.tip

      if (tip == 1) {
        for (let f of this.arrayPropostasPrazo) {
          if (f.numeroUnico == h.numeroUnico) {
            f.rateio = r
          }
        }
      } else {
        for (let f of this.arrayPropostasVista) {
          if (f.numeroUnico == h.numeroUnico) {
            f.rateio = r
          }
        }
      }

    },
  },

  mounted() {
    M.AutoInit();
    var elem = document.querySelector('.collapsible.expandable');
    M.Collapsible.init(elem, { accordion: false });
    var elems = document.querySelectorAll('.modal');
    M.Modal.init(elems);
    this.page = window.location.href.split("?")[0]

  },
};
</script>

<style>
.AzulEscuro {
  background-color: #475c62;
  margin-left: 10%;
  margin-right: 5%;
  height: 20% !important;
  border: solid;
  border-color: #979899;
  border-width: 1px;
}

.menuSuperior {
  margin-top: 0%;
  margin-right: 16%;
  min-height: 20% !important;
  width: 100%;
  padding: 3px;
}

.margem-menu {
  padding: 1px;
}

.bordaBranca {
  border: rgb(141, 139, 139);
  border-style: solid;
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
  margin-left: 85.5%;
  margin-top: -9px !important;
  z-index: 1;
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

/* .LinhaMenu {
    padding: 3% 2% 2% 4%;
} */

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

.icone-sumula:hover {
  transform: rotate(90deg);
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
  margin-left: 32%;
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

.nav-wrapper {
  background-color: #0c4e63 !important;
  padding-bottom: 2px;
  padding-left: 2%;
  color: #0a5481 !important;
  align-items: center;
}

.nav-wrapper ul li {
  margin-left: 3px;
  margin-bottom: 15px;
  margin-top: 3px;
  background-color: #d9dff5;
  height: 50px;
  border-radius: 3%;
  min-width: 180px;
  text-align: center;
}

.nav-wrapper ul {
  margin-left: 3px;
  padding: 2px;
  align-items: center;
}

.nav-wrapper ul li a:hover {
  background-color: #132680;
  color: #ffffff;
  height: 100%;
}

.nav-wrapper ul li a {
  height: 100%;
}

nav ul a {
  color: #417b9c !important;
  font-size: 18px;
}

nav ul a:hover {
  color: #ffffff !important;
  font-size: 18px;
}

nav ul li.ativo {
  background-color: #0c379e;
}

nav ul li.ativo:hover {
  background-color: #0d9e56;
  color: white !important;
}

nav ul li.ativo a {
  color: #100dbd !important;
  color: white !important;
}

nav ul li.ativo a:hover {
  color: #b4b3db !important;
}

#box_gsv {
  padding: 0px;
  margin: 0px;
  border-radius: 4px;
  padding: 1px;
}

#label_box_gsv {
  height: 60px !important;
}

.linha-time {}

.linha-time-conteudo {
  margin-top: 35px;
  margin-left: 5% !important;
  padding-left: 5%;
}

.item {
  margin-rigth: 10%;
  color: black;
  height: 1200%;
  margin-left: 1em !important;
  transform: translate(-30%, 0%);
  word-wrap: normal;
  font-size: 12px;
}

#dadosFunci {
  margin-left: 85%;
  margin-top: -8.5em;
  position: absolute;
  width: 12%;
  height: 18%;
  border-radius: 4px;
  transform: translate(-28.5%, 10%);
  border: 01px dotted #bcbcbc;
  background-color: rgb(3, 53, 82);
}

#propostas {
  background: #072f46;
  font-size: 16px;
  color: white;
  margin: 1% 1% 0% 1%;
  border-style: outset;
  border-color: white;
  border-width: 1px;
  height: 3rem;
  padding-left: 1rem;
}

#lista_propostas {
  margin: 0% 1% 0% 1%;
}

.collapsible-body {
  background: #064e77;
}

.collapsible-header {
  background: #0b3f5e;
  padding: 0%;
}

.detalhamento {
  margin: 0% 0% 0% 1%;
  border: 1px;
  border-top-style: none;
  border-right-style: solid;
  border-bottom-style: none;
  border-left-style: none;
  border-color: white;
  padding: 0px;
  display: inline;
}

.caixa_detalhes_esquerda {
  min-height: 50px;
}

.caixa_detalhes_direita {
  min-height: 40px;
}

.collapsible-header div.row {
  margin: 0px;
  padding: 0px;
  width: 100%;
  height: 100%;
}

.menu_detalhe {
  font-size: 25px;
  transform: translateX(-45%);
}

.menu_detalhe i:hover {
  background-color: white;
  color: grey;
}

.menu_detalhe a:hover {
  background-color: white;
  color: grey;
}

.menu_filtro_visao {
  background-color: #979899;
  opacity: 10%;
  min-width: 60px;
  min-height: 70px;
  margin-top: 1px;
  text-align: end;
  align-items: center;
  cursor: pointer;
  border-radius: 10%;
}

.menu_filtro_visao:hover {
  opacity: 0%;
  background-color: #5d5e5f;
}

.menu_filtro_visao.ativo_filtro {
  opacity: 0%;
  background-color: #767777;
  border: solid;
  border-color: #5e5e5f;
}

.menu_filtro_visao.ativo_filtro:hover {
  cursor: default;
}

.fa-handshake {
  padding-top: 10px;
  padding-right: 3px;
}

.inf_complementos {
  height: 250px;
  min-height: 250px;
}

#menu_inferior {
  padding: 1%;
}

div.caixa_detalhes_esquerda row {
  padding: 0px;
  margin: 0px;
  background-color: #ffffff !important;
  color: black;
}

#nr_proposta {
  padding: 0px !important;
  margin: 0px;
}

#tipo_proposta {
  padding: 0px !important;
  margin: 0px;
}

.linha_detalhe_esquerda {
  margin: 1px;
  padding: 0px;
  color: black !important;
  min-height: 45px;
}

#btn_tipo_proposta {
  width: 100%;
  min-height: 45px;
  text-align: center;
  align-content: flex-end;
  font-size: 18px;
}

#btn_proposta {
  width: 100%;
  min-height: 45px;
  text-align: center;
  align-content: flex-end;
  font-size: 18px;
}

#txt_saldo_vencido {
  height: 100%;
  border: none;
  text-align: right;
  font-size: 18px;
  color: black;
}

#saldo_vencido {
  text-align: right;
}

#valor_proposta {
  text-align: right;
}

#tipo_proposta {
  text-align: right;
}

#txt_saldo_total {
  height: 100%;
  border: none;
  text-align: right;
  font-size: 18px;
  color: black;
}

#txt_valor_proposta {
  height: 100%;
  border: none;
  text-align: right;
  font-size: 18px;
  color: black;
}

#saldo_total {
  text-align: right;
}

#tipo_acordo {
  margin: 0px;
  padding: 0px;
}

.detalhe_esquerda {
  text-align: right;
  font-size: 18px;
  color: black;
}

#icone_down_modelo {
  transform: rotate(90deg);
  margin: 0px;
}

#modelo_documento {
  padding: 0px;
  margin: 0px;
}

.titulo_box_detalhe {
  background-color: #0b3f5e;
  color: #ffffff;
  font-size: 18px;
}

.aberto i {
  color: grey;
}

.aberto {
  color: grey;
  font-size: 1em;
}

.olho {
  transform: translate(-10%, -90%) rotate(45deg);
  font-size: 2em !important;
  height: 100%;
  color: black !important;
}

.collapsible-header {
  height: 5%;
}

.fundo_cinza {
  background-color: grey;
  margin-bottom: 5px;
  border: solid;
  border-color: white;
}

.destaque_proposta {
  font-size: 22px;
  margin-bottom: 10px !important;
  border-radius: 4px;
}

.destaque_numero_proposta {
  font-size: 22px;
  background-color: #192a56;
  border-radius: 4px;
}

.destaque_operacao {
  font-size: 22px;
  background-color: #273c75;
  border-radius: 4px;
}

.caixa_detalhes_esquerda div.row {
  height: 8%;
}

.Det_Min_size_font {
  font-size: 12px;
}

.font-60 {
  font-size: 60%;
}

.direita {
  text-align: right !important;
}

.quebra {
  word-wrap: break-word;
}

#Download_Intrumento i.material-icons {
  font-size: 2em;
}

.font-2em {
  font-size: 2em !important;
}

.font-1em {
  font-size: 1em !important;
}

#tipo_Acordo {
  margin-left: 1em;
}

#div_resp_assinatura_bb {
  margin-left: -2em;
}

.div_tipo_Acordo {
  margin-top: 3em;
  padding-left: 3%;
}

.caixa_detalhes_direita div.input-field {
  position: relative;
  margin-top: 1rem;
  margin-bottom: 3%;
}

.lista_detalhes_Filtros {
  padding: 2px;
  margin-left: 1em;
  margin-right: 0em;
  margin-top: -1.5%;
}

.lista_detalhes_Filtros div.row {
  margin-left: 1em;
  margin-right: 0em;
  margin-bottom: 2px;
}

.header_lista_detalhes {
  margin-top: 4px;
  height: 2em;
  background-color: #192a56;
  border-radius: 4px;
}

#detalhamento_proposta_selecionada {
  margin-top: 1em;
  padding-top: 1em;
  display: none;
}

.texto-azul-escuro {
  color: #192a56;
}

.menu_detalhe i.medium {
  font-size: 3rem !important;
}

.botao_menu_filtro {
  margin-left: 0.2rem !important;
  margin-bottom: 2rem !important;
}

.font-2-5rem {
  font-size: 2.5rem !important;
}

.fundo-cinza-escuro {
  background-color: #686a72;
}

.caixa_dados_sumula {
  margin: 0 0 0 0 !important;
  height: 7rem;
}

#dados_despacho_sumula {
  border: 1px;
  border-style: hidden;
  border-color: #626262;
  padding: 1em;
  margin: 3px;

  border-radius: 4px;
  height: 20%;
}

#caixa_dados_gsv {
  border-radius: 4px;
  background-color: white;
  margin-bottom: 4px;
  height: 12%;
  margin-top: 2px;
}

.border-dotted {
  border: 1px dotted #626262;
}

#caixa_nome_superior {
  border: 1px;
  border-style: hidden;
  background-color: #ffffff;
}

#menu_detalhe_geral_esquerda {
  border-radius: 4px;
  padding-right: 0;
}

.font-07rem {
  font-size: 0.7rem;
}

.row.indigo.lighten-4:hover {
  background-color: white !important;
}

.row.indigo.lighten-3:hover {
  background-color: white !important;
}

.white-text {
  color: black;
}

.fundo_branco {
  background-color: white;
  margin: 3px;
  border-radius: 4px;
}

.fundo_branco div.row {
  margin: 0;
  border-radius: 4px;
}

#box_timeline {
  background-color: white;
  border-radius: 4px;
  height: 20%;
}

#caixa_timeline_esquerda {
  border-radius: 4px;
  margin-left: 1rem;
}

.font-3em {
  font-size: 3em !important;
}

.nome_item {
  height: 5em;
  align-content: center;
  max-width: 155px;
}

.valor_item {
  max-width: 155px;
}

.pad-left-1em {
  padding-left: 1 em;
}

.btn_pressionado {
  border: 1px solid aliceblue;
  box-shadow: 1px 1px;
}

.div_tipo_instrumento {
  max-height: 3em;
}

.font-12px {
  font-size: 12px !important;
}

.font-16px {
  font-size: 16px !important;
}

.borda_bottom {
  border-bottom: 1px dotted grey;
}

.header_lista_detalhes h5 {
  margin-top: 0;
}

.sublista {
  margin-top: 2px;
  margin-bottom: 1em;
  height: 2em;
  background-color: #192a56;
}

#GarantiaMantida {
  height: auto;
}

#GarantiaIncluida {
  height: auto;
}

#GarantiaExcluida {
  height: auto;
}

.auto-height {
  height: auto;
}

.fotoFunci {
  width: 80px;
  height: 80px;
}

.float-direita {
  margin-left: 95%;
  margin-top: 2em;
  margin-bottom: 3em;
}

#nomeFerramenta {
  cursor: pointer;
}

.ui-dialog.ui-corner-all.ui-widget.ui-widget-content.ui-front.ui-dialog-buttons.ui-draggable.ui-resizable {
  width: 33em !important;
}

.texto-Complemento {
  height: auto;
  resize: vertical;
}

#modalComplemento {
  width: 90% !important;
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

.success {
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

.erroObs {
  background-color: grey;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px;
  border-color: red;
  border-style: solid;
}

.Erro {
  background-color: grey;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px;
  border-color: red;
  border-style: solid;
}

#modalCheckList {
  width: 90%;
}

.texto-Justificativa.materialize-textarea {
  max-height: 5em !important;
}

.texto-Diligencia.materialize-textarea {
  max-height: 10em !important;
}

#div_nome_assinatura_bb {
  margin-left: -1em;
}

.ObsErroCaixa {
  border: 2px;
  border-color: red;
  border-style: solid;
}

#formCheck {
  overflow: auto;
  height: 88%;
  margin-bottom: 1%;
}

.font-size-0_8rem {
  font-size: 0.8rem;
}

#divAddFunci {
  margin-top: 2em;
}

#adicionaFunciAssina {
  cursor: pointer;
}

.gsv {
  padding: 0px !important;
}

.gsv input {
  -moz-appearance: textfield;
  appearance: textfield;
}

#vincular_gsv {
  margin-top: 1em;
}

#modalGSV {
  width: 70%;
}

.icone-add-protocolo:hover {
  color: green;
  cursor: pointer;
}

.linha-demanda:hover {
  background-color: grey;
  color: black;
}

#dialog {}

.switch label input[type="checkbox"]:checked+.lever::after {
  background-color: #5272e3;
}

#caixa_nome_superior div.fundo_branco.pad-left-1em {
  height: 12%;
}

.modal#modalPesquisa {
  padding: 1%;
  overflow-x: hidden;
  width: 80% !important;
}

.divChecklist {
  height: auto;
}

.div_tipo_Acordo {
  height: 10% !important;
}

#checkDragabble {
  /* position: absolute; */
  z-index: 1119;
  height: 92%;
  background-color: #f1f1f1;
  border: 1px solid #d3d3d3;
}

#mydivheader {
  padding: 10px;
  cursor: move;
  z-index: 10;
  background-color: #2196f3;
  color: #fff;
}


.iconeAjudaPergunta {
  cursor: help;
}

#checkDragabble h5:not(.grupos) {
  cursor: move;
}

.pergunta-div {
  cursor: default;
}

.iconeFecharAjudaPergunta {
  cursor: pointer;
  border-radius: 90%;
  border: 1px solid black;
}

#checkTriagemDragabble h5:not(.grupos) {
  cursor: move;
}

#checkTriagemDragabble {
  border: 1px solid white;
  padding-left: 1em;
}

input[type="number"] {
  -moz-appearance: textfield;
  appearance: textfield;
}

#divAddConta {
  cursor: pointer;
}

.box_nova_operacao {
  border: 1px solid white;
  height: 85px;
}

#drop_op {
  margin-right: 12px;
  background-color: white;
  height: auto;
}

.drag_item {
  width: 30% !important;
  height: 10%;
  background-color: #1565c0 !important;
  margin-right: 1px !important;
}

.drop_item {
  width: 100% !important;
  height: 20%;
  border-radius: 6px;
}

#divDropabble {
  height: auto;
}

.select-wrapper input.select-dropdown {
  color: white !important;
}

.select-wrapper.select-month input {
  color: black !important;
}

.select-wrapper.select-year input {
  color: black !important;
}

#headerPosicaoOriginaNumUnico {
  margin-left: 2em;
  border: 1px dotted;
}

.box_nova_operacao i {
  cursor: pointer;
}

#NumUnicoDragabble h5 {
  cursor: move;
}

#NumUnicoDragabble {
  height: auto;
}

.AbreNewUnico {
  cursor: pointer;
}

#divSumulaConta {
  cursor: pointer;
}

#adicionaContaVicunlda {
  cursor: pointer;
}

.div_texto_over {
  height: 30px !important;
  overflow: hidden !important;
  white-space: normal;
  text-overflow: ellipsis;
}

.realceSpan {
  font-size: 18px;
  color: darkblue;
}

.drag_item {
  border-radius: 6px;
  cursor: grab;
}

.drag_item_select {
  cursor: grabbing !important;
}

.border-rounded-total {
  border: 1px solid black;
  border-radius: 180px;
  padding: 6px;
  margin-left: 3px;
}

.border-rounded-total:hover {
  background-color: black;
  color: white;
}

a {
  cursor: pointer;
}

.loader {
  border: 16px solid #f3f3f3;
  /* Light grey */
  border-top: 16px solid #6096e3;
  /* Blue */
  border-bottom: 16px solid #f5e182;
  border-radius: 50%;
  width: 90px;
  height: 90px;
  animation: spin 2s linear infinite;
  text-align: center;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

#copy-votantes {
  position: absolute;
  z-index: 50 !important;
  min-width: 10% !important;
  min-height: 10% !important;
  background-color: white;
}

#copy-votantes>textarea {
  background-color: white;
  min-width: 700px;
  min-height: 400px;
}

#divDespacho {
  cursor: pointer;
  width: -webkit-fill-available;
}

.collapsible-header {
  border: 1px solid grey;
  background-color: #0b3f5e !important;
}

.collapsible.expandable {
  padding: 0 1% 0 1%;
}

.header-collapse {
  background: #0b3f5e;
}

.div_texto_over {
  height: 20%;
  overflow: hidden !important;
  text-overflow: initial;
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

.menuContabiliza {
  margin-left: 8% !important;
  margin-right: 8% !important;
  margin-bottom: 0px !important;
}

.border-dotted {
  height: 100% !important;
}

.conta-left {
  border-right: 4px solid grey;
}

.conta-right {}

/* #conteudo-body{
  padding-left: 3em;
  padding-right: 3em;
} */

#preloader_1 {
  display: block;
  bottom: 0px;
  width: 20px;
  height: 20px;
  margin-top: 0px;
  position: absolute;
  animation: blur 2s infinite !important;
  animation-delay: 0s;
}

#preloader_2 {
  position: relative;
  left: 50%;
  width: 40px;
  height: 40px;
  margin-top: 10%;
}

#preloader_2 img {
  position: relative;
  width: 100px;
  height: 100px;
  left: -30%;
  top: 160%;
  animation: blur 2s infinite !important;
}

#per2 {
  position: relative;
  animation: move 10s infinite ease-in-out !important;
  left: 50%;
  width: 40px;
  height: 40px;
  margin-top: -50%;
}

#preloader_2 span {
  display: block;
  bottom: 0px;
  width: 20px;
  height: 20px;
  background: #7259b6;
  position: absolute;
}

#preloader_2 span:nth-child(1) {
  animation: preloader_2_1 2s infinite linear !important;
}

#preloader_2 span:nth-child(2) {
  left: 20px;
  animation: preloader_2_2 2s infinite linear !important;

}

#preloader_2 span:nth-child(3) {
  top: 0px;
  animation: preloader_2_3 2s infinite linear !important;
}

#preloader_2 span:nth-child(4) {
  top: 0px;
  left: 20px;
  animation: preloader_2_4 2s infinite linear !important;
}

#preloader_2 span:nth-child(5) {
  top: 0px;
  left: 25px;
  animation: preloader_2_1 2s infinite linear !important;
}

#preloader_2 span:nth-child(6) {
  top: 0px;
  left: 25px;
  animation: preloader_2_2 2s infinite linear !important;
}

#preloader_2 span:nth-child(7) {
  top: 0px;
  left: 30px;
  animation: preloader_2_3 2s infinite linear !important;
}

#preloader_2 span:nth-child(8) {
  top: 0px;
  left: 10px;
  animation: preloader_2_4 2s infinite linear !important;
}

#preloader_2 span:nth-child(9) {
  top: 0px;
  left: 15px;
  animation: preloader_2_1 2s infinite linear !important;
}

@keyframes preloader_2_1 {
  0% {
    transform: translateX(0px) translateY(0px) rotate(0deg);
    border-radius: 20px;
    opacity: 0;
    background: #f7f6f3;
  }

  50% {
    transform: translateX(-200px) translateY(100px) rotate(-180deg);
    border-radius: 20px;
    background: #3498db;
    opacity: 1
  }

  80% {
    transform: translateX(0px) translateY(0px) rotate(-360deg);
    border-radius: 20px;
    opacity: 0.1
  }

  100% {
    transform: translateX(0px) translateY(0px) rotate(-360deg);
    border-radius: 0px;
    opacity: 0;
  }
}

@keyframes preloader_2_2 {
  0% {
    transform: translateX(0px) translateY(0px) rotate(0deg);
    border-radius: 20px;
    opacity: 0;
    background: #f7f6f3;
  }

  50% {
    transform: translateX(200px) translateY(100px) rotate(180deg);
    border-radius: 20px;
    background: #660ff1;
    opacity: 1
  }

  80% {
    transform: translateX(0px) translateY(0px) rotate(360deg);
    border-radius: 20px;
    opacity: 0.1
  }

  100% {
    transform: translateX(0px) translateY(0px) rotate(360deg);
    border-radius: 0px;
    opacity: 0;
  }
}

@keyframes preloader_2_3 {
  0% {
    transform: translateX(0px) translateY(0px) rotate(0deg);
    border-radius: 20px;
    opacity: 0;
    background: #f7f6f3;
  }

  50% {
    transform: translateX(-200px) translateY(-100px) rotate(-180deg);
    border-radius: 20px;
    background: #dee205;
    opacity: 1
  }

  80% {
    transform: translateX(0px) translateY(0px) rotate(-360deg);
    border-radius: 20px;
    opacity: 0.1
  }

  100% {
    transform: translateX(0px) translateY(0px) rotate(-360deg);
    border-radius: 0px;
    opacity: 0;
  }
}


@keyframes preloader_2_4 {
  0% {
    transform: translateX(0px) translateY(0px) rotate(0deg);
    border-radius: 20px;
    opacity: 0;
    background: #f7f6f3;
  }

  50% {
    transform: translateX(200px) translateY(-100px) rotate(180deg);
    border-radius: 20px;
    background: #100e92;
    opacity: 1
  }

  80% {
    transform: translateX(0px) translateY(0px) rotate(360deg);
    border-radius: 20px;
    opacity: 0.1
  }

  100% {
    transform: translateX(0px) translateY(0px) rotate(360deg);
    border-radius: 0px;
    opacity: 0;
  }
}

@keyframes preloader_2_5 {
  0% {
    transform: translateX(0px) translateY(0px) rotate(0deg);
    border-radius: 20px;
    opacity: 0;
    background: #f7f6f3;
  }

  50% {
    transform: translateX(-200px) translateY(100px) rotate(-180deg);
    border-radius: 20px;
    background: #3498db;
    opacity: 1
  }

  80% {
    transform: translateX(0px) translateY(0px) rotate(-360deg);
    border-radius: 20px;
    opacity: 0.1
  }

  100% {
    transform: translateX(0px) translateY(0px) rotate(-360deg);
    border-radius: 0px;
    opacity: 0;
  }
}

@keyframes preloader_2_6 {
  0% {
    transform: translateX(0px) translateY(0px) rotate(0deg);
    border-radius: 20px;
    opacity: 0;
    background: #f7f6f3;
  }

  50% {
    transform: translateX(200px) translateY(100px) rotate(180deg);
    border-radius: 20px;
    background: #f1c40f;
    opacity: 1
  }

  80% {
    transform: translateX(0px) translateY(0px) rotate(360deg);
    border-radius: 20px;
    opacity: 0.1
  }

  100% {
    transform: translateX(0px) translateY(0px) rotate(360deg);
    border-radius: 0px;
    opacity: 0;
  }
}

@keyframes preloader_2_7 {
  0% {
    transform: translateX(0px) translateY(0px) rotate(0deg);
    border-radius: 20px;
    ;
    opacity: 0;
    background: #f7f6f3;
  }

  50% {
    transform: translateX(-200px) translateY(-100px) rotate(-180deg);
    border-radius: 20px;
    background: #100e92;
    opacity: 1
  }

  80% {
    transform: translateX(0px) translateY(0px) rotate(-360deg);
    border-radius: 20px;
    opacity: 0.1
  }

  100% {
    transform: translateX(0px) translateY(0px) rotate(-360deg);
    border-radius: 0px;
    opacity: 0;
  }
}


@keyframes preloader_2_8 {
  0% {
    transform: translateX(0px) translateY(0px) rotate(0deg);
    border-radius: 20px;
    ;
    opacity: 0;
    background: #f7f6f3;
  }

  50% {
    transform: translateX(200px) translateY(-100px) rotate(180deg);
    border-radius: 20px;
    background: #1108bb;
    opacity: 1
  }

  80% {
    transform: translateX(0px) translateY(0px) rotate(360deg);
    border-radius: 20px;
    opacity: 0.1
  }

  100% {
    transform: translateX(0px) translateY(0px) rotate(360deg);
    border-radius: 0px;
    opacity: 0;
  }
}

@keyframes blur {
  0% {
    opacity: 0
  }

  ;

  25% {
    opacity: 0
  }

  75% {
    opacity: 0;
  }

  80% {
    opacity: 0.5;
  }

  90% {
    opacity: 0.9;
  }

  100% {
    opacity: 0.1
  }

  ;
}

@keyframes move {
  0% {
    transform: rotate(0deg)
  }

  25% {
    transform: rotate(90deg)
  }

  50% {
    transform: rotate(180deg)
  }

  75% {
    transform: rotate(270deg)
  }

  100% {
    transform: rotate(360deg)
  }

  /* 50%{
    transform:rotate(360deg)

  }
   60% {
    transform:rotate(360deg)
  }
 70% {
    transform:rotate(270deg)
  }
   80% {
    transform:rotate(180deg)
  }
   90% {
    transform:rotate(90deg)
  }
  100%{
    transform:rotate(0deg)

  } */
}
</style>