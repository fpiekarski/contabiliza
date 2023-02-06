<template>
    
</template>


<script>
import M from "materialize-css";
export default {
      props:{
       prefixo: Number,
       conta:Number,
       NumUnico:String,

    },setup() {
        
    },
    data(){
      return{
        setAll:false
      }
    },
    mounted(){
     const tool = document.querySelectorAll('.tooltipped');
     M.Tooltip.init(tool)
    },
    methods:{
      checkChange: function(o){
       this.setAll = o.target.checked
      }
    }
}
</script>
