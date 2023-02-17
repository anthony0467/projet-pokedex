<script>
export default{
    props:{
        apiResponse: {
            type: Array,
            required: true,
            default:() => []
        },
        
        rideau: {
            type: Function,
            required: true,
            
        },
        clear: {
            type: Function,
            required: true,
         },
    },

    data(){
        return{
          message: ""
        }
    },
    methods:{
        // recherché le pokemon en utilisant la data message 
        searchPok(){
            this.$emit('search',this.message)
            this.message = ''
        },

        // renvoi la liste complete des pokemons et efface la fiche detaillé si elle est ouverte

        completeList(){
            this.apiResponse
            this.clear()
            //this.emptyArray.splice(0, 1)
        },

        rideauProp(){
            this.rideau()
        }
    },
    
}

</script>

<template>
    <form @submit.prevent="searchPok" id="the_form" action="" >
        <input @click="test" id="searchinput" name="searchinput" type="text" placeholder="Rechercher mon Pokémon"  v-model="message" autocomplete="off" >
        <div>
            <button @click="rideauProp" type="submit" value="search">Rechercher</button>
            <button @click="completeList">Reinitialiser</button>
        </div>
    </form>
    
</template>

<style scoped>
div{
    text-align: center;
}

form{
    margin: 0  2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
}

input{
    text-align: center;
    font-size: 18px;
    padding: .75rem 0.75rem;
    width: 70%;
    border:none;
    border-radius: 25px;
}

button{
    margin-top: 1rem;
}

.flex{
    display: flex;
}

.none{
    display: none;
}

</style>