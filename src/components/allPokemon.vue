<script>
export default {
  props: {
    apiResponse: {
      type: Array,
      required: true,
      default: () => []
    },
    filteredPokemon: {
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
    }
  }

}

</script>

<template>
  <div v-for="api in apiResponse" :key="api" @click="addDetailPok(api)">
    <h3 :style="{ color: color }">{{ api.name }}</h3>
    <img style="max-width: 300px;" :src="api.image" :alt="api.name" :title="api.name">
  </div>

</template>

<style scoped>
div {
  cursor: pointer;
}

h3 {
  text-align: center;
}
</style>