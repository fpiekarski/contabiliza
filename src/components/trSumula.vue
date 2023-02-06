<template>
        <tr>

        <td>{{nrSumula}}</td>
        <td>{{cliente}}</td>
        <td>{{valor}}</td>
        <td>{{status}}</td>
        <td></td>
        </tr>

   
</template>

<script>
import "material-design-icons/iconfont/material-icons.css";

export default {
  name: "trSumula",
  props: {
    nrSumula: String,
    cliente:String,
    valor:String,
    status:String
  },
 

}
</script>
<style>
</style>