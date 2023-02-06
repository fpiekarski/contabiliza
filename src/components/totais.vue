<template>
    <div class="col s12" style="margin-top:2em">
        <div class=" col s2">
            <h5>Totais:</h5>
        </div>
        <div class=" col s10  text-blue-grey text-darken-3">
            <div class="col s12 border">
                <div class="col s6">Total de honorarios (b)</div>
                <div class="input-field col s6 input-total">
                    <input id="totalHonorarios" readonly type="text" class="" :value="honorariosFMT">
                </div>
            </div>
            <div class="col s12 border">
                <div class="col s6">Total de custas (c)</div>
                <div class="input-field col s6 input-total">
                    <input id="totalCustas" readonly type="text" class="" :value="custasFMT">
                </div>
            </div>
            <div class="col s12 border">
                <div class="col s6">Total do acordo (d)</div>
                <div class="input-field col s6  input-total">
                    <input id="totalAcordo" readonly type="text" class="" :value="valorTotalFMT">
                </div>
            </div>
            <div class="col s12 border">
                <div class="col s6">Valor IOF (e)</div>
                <div class="input-field col s6  input-total">
                    <input id="totalAcordo" readonly type="text" class="" v-bind:value="valorFinalIof">
                </div>
            </div>
            <div class="col s12 border">
                <div class="col s6">Total de entrada (f)</div>
                <div class="input-field col s6  input-total">
                    <input id="totalAcordo" readonly type="text" class="" v-bind:value="valorEntradaFMT">
                </div>
            </div>
        </div>
        <div class="row col s12">
            <div class="col s7">Saldo em conta após contabilização e repasses <br> (a-b+c+d+e+f) </div>
            <div class="col s5">
                <input id="totalAcordo" type="text" readonly
                    v-bind:class="[this.valorFinal < 0 ? 'row col s10  red darken-4' : this.valorFinal == 0 ? ' row col s10 green accent-3' : 'row col s10  teal darken-4 white-text']"
                    :value="valorFormatado">
                <span v-bind:class="[this.valorFinal <= 0 ? 'hide' : '']"> <i class="material-icons tooltipped"
                        data-tooltip="Atenção, ainda há saldo disponível nas contas">new_releases</i></span>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    props: {
        valorTotal: { type: [Number, Object, String, Function], default: -1 },
        custas: { type: [Number, Object, String, Function], default: 0 },
        honorarios: { type: [Number, Object, String, Function], default: 0 },
        valorFormatado: { type: [Number, Object, String, Function], default: "0" },
        valorFinal: { type: [Number, Object, String, Function], default: 0 },
        valorEntrada: { type: [Number, Object, String, Function], default: 0 },
        valorFinalIof:{ type: [Number, Object, String, Function], default: 0 },
    },
    methods: {
        atualiza: function () {

        },
        formataDinheiro: function (n) {
            console.log(n)
            //  const v = parseFloat(n)
            return (
                "R$ " + n.toFixed(2).replace(".", ",").replace(/(\d)(?=(\d{3})+,)/g, "$1.")
            );
        },
    }, data() {
        return {
            valorTotalFMT: 0,
            custasFMT: 0,
            honorariosFMT: 0,
            valorEntradaFMT: 0,

        }
    },
    watch: {

        valorTotal: function () { this.valorTotalFMT = this.formataDinheiro(this.valorTotal) },
        custas: function () { this.custasFMT = this.formataDinheiro(this.custas) },
        honorarios: function () { this.honorariosFMT = this.formataDinheiro(this.honorarios) },
        valorEntrada: function () { this.valorEntradaFMT = this.formataDinheiro(this.valorEntrada) }
    }
}

</script>

<style scoped>
.border {
    border: 1px dotted grey;
    margin-bottom: 2px;
    vertical-align: inherit;
}

.input-total {
    margin: 0;
}
</style>