<script>
export default {
  emits: ['search', 'detail'],
  props: {
    apiResponse: {
      type: null
    },
  
    color: {
      type: String,
      default: 'white'
    },
    api: {
      type: Object
    },
    message: {
      type: String,
      default: ""
    },
    typePok:{
      type: String,
      default: ''
    },
    
  },

  data() {
    return {
      name: '',
    }
  },

  methods: {
    addDetailPok(api) { // ajout de ma fiche detaillé pokemon au clic
      this.$emit('detail', api)
    },

    searchPokemon(message) {
      this.message = message;
    },
    filterTypePok(typePok){
      this.typePok = typePok;
    }
  },
  computed:{
    // filtrer mes pokemons 
    filteredPokemon() {
      if(this.message){ // filtrer par recherche de nom 
        return this.apiResponse.filter((api) => {
        return api.name.toLowerCase().includes(this.message.toLowerCase())
      })
      }
      if(this.typePok){ // filtrer par type de pokemon
        switch(this.typePok){
          case 'all': // récupérer tous les pokemons
            return this.apiResponse;
          break;
          case this.typePok: // récupérer en fonction du type
          return this.apiResponse.filter((api) => {
            for(let i =0; i <= api.apiTypes.length; i++){ // récupérer tous les types de chaque pokemon
              if (api.apiTypes[i]?.name?.includes(this.typePok)) { // vrai si un des types correspond
              return true;
            }
            }
          })
          break;
          
        }
      }
      return this.apiResponse;
    },

    initialList(){
            return this.apiResponse;
    }
  },

}

</script>

<template>
  <div class="container">
    <div class="zoom" v-for="api in filteredPokemon" :key="api" @click="addDetailPok(api)">
        <img style="max-width: 300px;" :src="api.image" :alt="api.name" :title="api.name" loading="lazy" width="300" height="300">
      <h3 :style="{ color: color }">{{ api.name }}</h3>
     
   </div>
</div>

</template>

<style scoped>
.container{
  padding-top: 3rem;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
}

.zoom{
  transition: .35s;
}
.zoom:hover{
  transform: scale(1.1);
  transition: .35s;
}

div {
  cursor: pointer;
}
h3 {
  text-align: center;
}
</style>