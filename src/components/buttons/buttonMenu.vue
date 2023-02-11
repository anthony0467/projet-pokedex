<script>
export default{
    props:{
        menu: {
            type: Object,
            required: true,
            default:() => {}
        }
    },

    data(){
        return{
          
        }
    }
}

</script>

<template>
    
  <a href="#"><i :class="menu.icon" ></i> {{ menu.name }}</a>
  
</template>

<style scoped>
li:hover a{
    color: #fff;
}

</style>