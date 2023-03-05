<script>
import { mapGetters,mapActions } from 'vuex';
import axios from 'axios';
import menuPod from './components/menuPod.vue';
import allPokemon from './components/allPokemon.vue';
import cardPokemon from './components/cardPokemon.vue';
import loading from './components/loading.vue';
export default {
  
  components: {
    menuPod,
    allPokemon,
    cardPokemon,
    loading,
  },

  data() {
    return {
      //apiResponse: null, // API
      bgMain: 'bg-90',
      effect: 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)', // effet rideau menu
      message: '',
      typePok: '',
      selectedItem: null,
      showTable: false,
      isContentLoaded: true,
      theme: 'light',
      color: 'purple'
    }
  },

  computed: {
    ...mapGetters(['apiResponse']),
  },

  methods: {
    ...mapActions(['setApiResponse']),

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
    },
    
  },

  // set changement boolean showtable



 created() { // API POKEMON
    try {
      //await new Promise(resolve => setTimeout(resolve, 2000)); //Chargement d'une seconde optionnelle
      axios.get('https://pokebuildapi.fr/api/v1/pokemon')
        .then(response => {
          this.setApiResponse(response.data) // setApiResponse pour le store
        })
    } catch (error) {
      console.log(error)
    }
    console.log('coucou')
  },

  mounted() {
    setTimeout(() => {
      if(this.apiResponse){
        this.isContentLoaded = false;
      }
    }, 3000)
  }

 

}


</script>

<template>
  <loading  v-if="isContentLoaded" />
  <div :class="[theme,  {'fade': !isContentLoaded} ]" v-else >
  <header>
    <!--MENU-->
    <menuPod @search="searchPokemon" @selected-value="handleSelectedValue" @reset-all-pokemons="resetAllPokemon" :bg-main="bgMain" @change-width="rideau" :clear="clear" :theme="theme" @change-theme="changeTheme" :color="color"/>
  </header>

  <main :class="bgMain">
    <!--Fiche détaillé pokemon-->
    <cardPokemon id="targetElement" v-show="showTable" :selectedItem="selectedItem"
      :showTable="showTable" :clear="clear" :color="color" />
    <!--Liste complète pokemon-->
    <allPokemon :message="message" :typePok="typePok" @search="searchPokemon" @detail="addDetailPok" :color="color" /> <!--Liste Pokemon-->
  </main>

</div>
</template>

<style scoped>

.loading{
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
}
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


.fade{
  animation: fade  ease-out;
  animation-duration: 2s;
}



@keyframes fade {
  0% {

    opacity: 0;
    
    
   
  }

  100% {
   
    opacity: 1;

  }
}


</style>
