<script>
import axios from 'axios';
import menuPod from './components/menuPod.vue';
import allPokemon from './components/allPokemon.vue';
import cardPokemon from './components/cardPokemon.vue';
import loading from './components/loading.vue';
import loadingAlternative from './components/loadingAlternative.vue';
export default {
  
  components: {
    menuPod,
    allPokemon,
    cardPokemon,
    loading,
    loadingAlternative,
  },

  data() {
    return {
      apiResponse: null, // API
      bgMain: 'bg-90',
      effect: 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)', // effet rideau menu
      message: '',
      typePok: '',
      selectedItem: null,
      showTable: false,
      isLoading: true,
      theme: 'light',
      color: 'purple'
    }
  },

  methods: {

    rideau() { // gerer la taille de ma balise main quand mon menu est ouvert ou fermé
      this.bgMain = this.bgMain === 'bg-90' ? 'bg-75' : 'bg-90';
    },

    addDetailPok(api) {  //ajouter une fiche pokemon detaillé 

      this.selectedItem = api
      this.showTable = true;
      // changement d'état au clic !!
      this.$nextTick(() => {
        this.scrollToItem();
      })

    },

    scrollToItem() { // scroll vers l'element cardPokemon
      const targetElement = document.querySelector('#targetElement')
      if (targetElement) {
        targetElement?.scrollIntoView({ behavior: 'smooth' })
      }
    },


    clear() {
      // effacer ma fiche détaillé sur le bouton
      this.showTable = false
    }
    ,

    // recherche pokemon composant menuPod / search
    searchPokemon(value) {
      this.message = value
      
    },

    handleSelectedValue(value) { // récupérer la valeur de mon champ select
      this.typePok = value;
    },

   resetAllPokemon(){ // select tous
    this.typePok = ''
   },

   changeTheme(){ // changement de theme sombre/clair
      const body = document.querySelector('body');
      body.classList.toggle('light');
      body.classList.toggle('dark');
      this.theme = this.theme === 'light' ?  'dark'  : 'light' ;
      this.color = this.color == 'purple' ? 'white' : 'purple' ;
      console.log(this.theme);
    },
    
  },

  // set changement boolean showtable



  async mounted() { // API POKEMON
    try {
      //await new Promise(resolve => setTimeout(resolve, 1000000)); //Chargement d'une seconde optionnelle
      await axios.get('https://pokebuildapi.fr/api/v1/pokemon')
        .then(response => {
          this.apiResponse = response.data
        })
    } catch (error) {
      console.log(error)
    }

  },

}


</script>

<template>
  <loading  v-if="!apiResponse" />
  <div :class="theme" v-else>
  <header>
    <!--MENU-->
    <menuPod @search="searchPokemon" @selected-value="handleSelectedValue" @reset-all-pokemons="resetAllPokemon" :apiResponse="apiResponse" :bg-main="bgMain" @change-width="rideau" :clear="clear" :theme="theme" @change-theme="changeTheme" :color="color"/>
  </header>

  <main :class="bgMain">
    <!--Fiche détaillé pokemon-->
    <cardPokemon id="targetElement" :apiResponse="apiResponse" v-show="showTable" :selectedItem="selectedItem"
      :showTable="showTable" :clear="clear" :color="color" />
    <!--Liste complète pokemon-->
     

    <allPokemon :message="message" :typePok="typePok" @search="searchPokemon"  :apiResponse="apiResponse"
      @detail="addDetailPok" :color="color" /> <!--Liste Pokemon-->

  </main>
</div>
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


.transition-loading{
  animation: toprideau 1s ease-out;
}





@keyframes toprideau {
  0% {

    clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
   
  }

  100% {
   
    clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);

  }
}


</style>
