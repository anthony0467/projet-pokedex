<script>
import { resolveDirective } from 'vue';
import aleatoirePok from './aleatoirePok.vue'
import buttonMenu from './buttons/buttonMenu.vue';
import search from './search.vue';
export default {
  emits: ['search', 'change-width','selected-value', 'reset-all-pokemons', 'change-theme'],
  components: {
    buttonMenu,
    aleatoirePok,
    search
  },
  props: {
    apiResponse: {
     
    },
    
    color: {
      type: String,
      default: 'purple'
    },
    bgMain: {
      type: String,
      default: 'bg-90'
    },
    clear: {
            type: Function,
            required: true,
         },

    theme: {
      type:String,
      default: 'dark'
    }

  },

  data() {
    return {
      close: 'initial',
      //test: 'invisible',
      name: '',
      typePok: '',
    }
  },
  
  methods: {

    rideau() {
      this.$emit('change-width');
      this.close = this.close === 'initial' ? 'invisible' : 'initial'; // fermeture et ouverture du MENU
    
    },
   
    // recherche pokemon composant search
    handleSearch(value) { 
      this.$emit('search', value)
    },

    filterTypePok(typePok) { 
      this.$emit('filterPok', typePok)
    },

    handleSelectedValue(value) { // récupérer la valeur de mon champ select
      this.$emit('selected-value', value);
    },
    resetAllPokemon(){
      this.$emit('reset-all-pokemons')
    },
    changeTheme(){
     this.$emit('change-theme')
    }
  },


  

}

</script>

<template>
  <div class="contain-podcast" :class="close">
    <div class="contain-title-podcast"><p>{{ typePok }}</p>
      <h2>Pokédex</h2> - <i @click="rideau" class="fa-sharp fa-solid fa-xmark" style='cursor:pointer; color: #fff;
	  font-size: 25px; padding: 1rem;'></i>
    </div>
    <search @search="handleSearch" @selected-value="handleSelectedValue" @reset-all-pokemons="resetAllPokemon" :apiResponse="apiResponse"  :rideau="rideau" :clear="clear"/>
    <aleatoirePok :apiResponse="apiResponse" /> <!--carte pokemon genéré aléatoirement-->
    <button class="themeButton" @click="changeTheme">
      <span v-if="theme == 'dark'"><p>Thème <i class="fa-regular fa-moon"></i></p></span>
      <span v-else>Thème  <i class="fa-regular fa-sun"></i></span></button>
  </div>

  <h2 @click="rideau" :class="color" style="position: fixed; z-index: 98;cursor: pointer; font-weight: bold;">Menu</h2>
  

  
</template>

<style scoped>
@media screen and (max-width: 992px) {
  .contain-podcast {
    width: 100%;
  }
}

i{
  font-size: 15px;
}

.contain-podcast{
  display: flex;
  flex-direction: column;
    justify-content: space-between;
    align-items: inherit;
}
.contain-title-podcast {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.initial {

  clip-path: polygon(0 0, 0% 0, 0% 100%, 0% 100%);
  transition: .35s
}

.invisible {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
  transition: .35s
}

.contain-podcast {
  z-index: 99;
  background: rgb(46, 47, 117);
  background: linear-gradient(174deg, rgba(46, 47, 117, 1) 91%, rgba(0, 0, 0, 1) 100%);
  height: 100%;
  position: fixed
}

.title-violet {
  cursor: pointer;
  color: rgb(46, 47, 117);
  font-weight: bold;
}

.themeButton{
  background: none;
}

h2 {
  flex-grow: 1;
}

h3 {
  text-align: center;
}

li {
  padding: .75rem 0;
  padding-right: 3rem;
  padding-left: 1rem;
  transition: .35s;
}

li:hover {
  border-radius: 50px;
  background: rgb(67, 68, 145);
  transition: .35s;
}

button:hover span{
font-weight: bold;
}

</style>