<script>
import { mapGetters } from 'vuex';
export default{
    props:{
        
        
        rideau: {
            type: Function,
            required: true,
            
        },
        clear: {
            type: Function,
            required: true,
         }
    },

    data(){
        return{
          message: "", // recherche par nom 
          typePok: "", // recherche par type
        }
    },
    methods:{
       
        // recherché le pokemon en utilisant la data message 
        searchPok(){
            this.$emit('search',this.message)
            this.$emit('filterPok',this.typePok)
            this.message = ''
        },

        // renvoi la liste complete des pokemons et efface la fiche detaillé si elle est ouverte

        completeList(){
            this.$emit('reset-all-pokemons')
            this.clear()
            //this.emptyArray.splice(0, 1)
        },

        rideauProp(){
            this.rideau()
        },
        
        emitSelectedValue() {
            this.$emit('selected-value', this.typePok);
        }
    },
    
    
    computed:{
        ...mapGetters(['apiResponse']), // API STORE
        
        filterType(){ // set = récupérer valeur unique dans un tableau
            return [...new Set(this.apiResponse?.map(api => api?.apiTypes[0]?.name))];
         }
    }
         
    
}

</script>

<template>
    <form @submit.prevent="searchPok" id="the_form">
        <input @click="test" id="searchinput" name="searchinput" type="text" placeholder="Rechercher mon Pokémon"  v-model="message" autocomplete="off" >
        <div>
            <button @click="rideauProp" type="submit" value="search">Rechercher</button>
            <button @click="completeList">Reinitialiser</button>
        </div>
        <select v-model="typePok" @change="emitSelectedValue"><p>{{ typePok }}</p>
            <option disabled value="">Selectionner un type</option>
            <option value="all">Tous</option>
            <option :value="api" v-for="api in filterType" :key="api">{{ api }}</option>
        </select>
    </form>
    
</template>

<style scoped>

@media screen and (min-width: 750px) {
  select{
    font-size: 16px;
    padding: 0.5rem 2rem;
  }

  input{
    font-size: 18px!important;
  }
}

div{
    text-align: center;
}

form{
    margin: 0  2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;

}

input{
    text-align: center;
    font-size: 12px;
    padding: .75rem 0.75rem;
    width: 70%;
    border:none;
    border-radius: 25px;
}

select{
    margin-top: 2rem;
    padding: 0.25rem 1rem;
    border-radius: 25px;
    font-family: 'Montserrat';
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