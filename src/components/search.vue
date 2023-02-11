<script>
export default{
    props:{
        apiResponse: {
            type: Array,
            required: true,
            default:() => []
        }
    },

    data(){
        return{
          message: ''
        }
    },
    methods:{
        searchPok(){
            console.log('coucou')
        }
    },
    watch: {
    messageInput(newMessage){
      this.$emit('message-changed', newMessage)
    }
  }
  

}

</script>

<template>
    <form @submit.prevent="searchPok" id="the_form" action="">
        <input id="searchinput" name="searchinput" type="search" placeholder="Rechercher mon Pokémon"  v-model="message"> {{ message }}
    </form>
    
</template>

<style scoped>

form{
    margin: 0  2rem;
}

input{
    font-size: 18px;
    padding: .75rem 0.75rem;
    width: 70%;
    border:none;
    border-radius: 25px;
}

.flex{
    display: flex;
}

.none{
    display: none;
}

</style>