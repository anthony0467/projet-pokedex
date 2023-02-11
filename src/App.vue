<script>
import axios from 'axios'
import menuPod from './components/menuPod.vue';
import allPokemon from './components/allPokemon.vue';
import detailPokemon from './components/detailPokemon.vue';

export default {
  components: {
    menuPod,
    allPokemon,
    detailPokemon,

  },

  data() {
    return {
      apiResponse: [], // API
      titleColor2: 'rgb(46,47,117)',
      bgMain: 'bg-90',
      emptyArray: [], // tableau fiche détaillé pokemon
      effect: 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)', // effet rideau menu
      message:''
    }
  },
  computed: {
    filterApi() {
      return this.apiResponse.slice(0, 3)
    },


  },

  methods: {

    rideau() { // gerer la taille de ma balise main quand mon menu est ouvert ou fermé
      this.bgMain = this.bgMain === 'bg-90' ? 'bg-75' : 'bg-90';
    },

    addDetailPok(api) {  //ajouter une fiche pokemon detaillé 
      const targetElement = document.querySelector('#targetElement')

      if (this.emptyArray.length > 0) {
        this.emptyArray.splice(0, 1) //  suppresion du 1er element 
        targetElement.scrollIntoView({ behavior: 'smooth' }) // scroll vers l'element
      }
      this.emptyArray.push(api) // ajouter mon élément
    },

    // recherche pokemon composant menuPod / search
    searchPokemon(value) {
      this.message = value
    }
  },
  

  created() { // API POKEMON
    axios.get('https://pokebuildapi.fr/api/v1/pokemon/generation/1')
      .then(response => {
        this.apiResponse = response.data
      })
      .catch(error => {
        console.log(error)
      })
  }
}

</script>

<template>
  <header>
    <menuPod @search="searchPokemon" :apiResponse="apiResponse" :bg-main="bgMain" @change-width="rideau" :emptyArray="emptyArray" />
    <!--MENU-->

  </header>

  <main :class="bgMain">
    <detailPokemon id="targetElement" :emptyArray="emptyArray" v-if="emptyArray.length > 0" />
    <!--Fiche détaillé pokemon-->

    <ul>
      <allPokemon :message="message" @search="searchPokemon" :color="titleColor2" :apiResponse="apiResponse" @detail="addDetailPok" /> <!--Liste Pokemon-->
    </ul>




  </main>
</template>

<style scoped>
.effect {
  clip-path: polygon(0 100%, 100% 100%, 100% 0, 0 0);
  transition: .5s;
}

.bg-75 {
  max-width: 75%;
  transition: .35s;
}

.bg-90 {
  max-width: 100%;
  transition: .35s;
}

ul {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
}
</style>
