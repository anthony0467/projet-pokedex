<script>
import { mapGetters } from 'vuex';
export default {
  props: {
    color: {
      type: String,
      default: 'white'
    },
  },

  data() {
    return {
      name: '',
    }
  },


  computed: {
    ...mapGetters(['apiResponse']), // API STORE

    randomNum() {
      return Math.floor(Math.random() * 897) + 1; // généré un nombre aléatoire entre 1 et 151;
    },

    filterPokTitle() {
      return this.apiResponse?.find((api) => api?.id == this?.randomNum)?.name  // récupéré le nom du pokemon aléatoirement en utilisant l'id 

    },
    filterPokImg() {
      return this.apiResponse?.find((api) => api?.id == this?.randomNum)?.image // récupéré l'image du pokemon aléatoirement en utilisant l'id
    }
  }

}

</script>

<template>
  <div>
    <h3 :style="{ color: color }">{{ filterPokTitle }}</h3> <!--Nom du pokemon -->
    <img :src="filterPokImg" :alt="filterPokTitle" :title="filterPokTitle"> <!--Image du pokemon-->
  </div>

</template>

<style scoped>
h3 {

  text-align: center;
}
</style>