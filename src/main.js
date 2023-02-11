import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
/*
const store = createStore({
    state () {
      return {
        emptyArray: []
      }
    },
    mutations: {
        clear (state) {
         state.emptyArray.splice(0,1)
        }
    }
  })

  store.commit('emptyArray')
  console.log(store.state.emptyArray)*/

import './assets/main.css'

createApp(App).mount('#app')
//.use(store)