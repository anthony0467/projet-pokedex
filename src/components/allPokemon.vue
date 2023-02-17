<script>
export default {
  emits: ['search', 'detail'],
  props: {
    apiResponse: {
      type: Array,
      required: true,
      default: () => []
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
    }
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
    }
  },
  computed:{
    // filtrer mes pokemons 
    filteredPokemon() {
      return this.apiResponse.filter((api) => {
        return api.name.toLowerCase().includes(this.message.toLowerCase())
      })
    }
  },

}

</script>

<template>
  <div class="container">
    <div v-for="api in filteredPokemon" :key="api" @click="addDetailPok(api)">
      <h3 :style="{ color: color }">{{ api.name }}</h3>
      <img style="max-width: 300px;" :src="api.image" :alt="api.name" :title="api.name">
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

div {
  cursor: pointer;
}
h3 {
  text-align: center;
}
</style>