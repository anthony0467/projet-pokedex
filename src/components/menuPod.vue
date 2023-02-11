<script>
import { resolveDirective } from 'vue';
import aleatoirePok from './aleatoirePok.vue'
import buttonMenu from './buttons/buttonMenu.vue';
import search from './search.vue';
export default {
  emits: ['search', 'change-width'],
  components: {
    buttonMenu,
    aleatoirePok,
    search
  },
  props: {
    apiResponse: {
      type: Array,
      required: true,
      default: () => []
    },
    emptyArray: {
      type: Array,
      required: true,
      default: () => []
    },
    color: {
      type: String,
      default: 'red'
    },
    bgMain: {
      type: String,
      default: 'bg-90'
    },

  },

  data() {
    return {
      menus: [{ id: 0, icon: 'fas fa-home', name: 'Home' },
      { id: 1, icon: 'fa-solid fa-microphone-lines', name: 'Latest episodes' },
      { id: 2, icon: 'fa-regular fa-floppy-disk', name: 'Saved' },
      { id: 3, icon: 'fa-regular fa-window-maximize', name: 'Browse' },
      { id: 4, icon: 'fa-regular fa-circle-down', name: 'Downloads' }
      ],
      close: 'initial',
      //test: 'invisible',
      name: ''
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
    }
  },


}

</script>

<template>
  <div class="contain-podcast" :class="close">
    <div class="contain-title-podcast">
      <h2>Pokédex</h2> - <i @click="rideau" class="fa-sharp fa-solid fa-xmark" style="cursor:pointer; color: #fff;
	font-size: 25px; padding: 1rem;"></i>
    </div>
    <search @search="handleSearch" :apiResponse="apiResponse" :emptyArray="emptyArray"/>
    <ul>
      <li v-for="menu in menus">
        <buttonMenu :menu="menu" />
      </li>
    </ul>
    <aleatoirePok :apiResponse="apiResponse" /> <!--carte pokemon genéré aléatoirement-->
  </div>

  <h2 @click="rideau" class="title-violet" style="position: fixed; z-index: 98;">Menu</h2>
  
</template>

<style scoped>
@media screen and (max-width: 992px) {
  .contain-podcast {
    width: 100%;
  }
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
</style>