import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'

const store = createStore({
    state () {
      return {
        apiResponse: null
      }
    },
    getters: {
      apiResponse(state){
        return state.apiResponse
      },
     /* getPoisonType(state){
        return state.apiResponse.filter( pok => {
          return pok.apiTypes.some(type => type.name === 'Poison')
        })
      }*/
    },
    mutations: {
       SET_API_RESPONSE(state, data){
        state.apiResponse = data
       } 
    },
    actions: {
      setApiResponse(context, data){
        context.commit('SET_API_RESPONSE', data)
      }
    }
  })

  
  

import './assets/main.css'

createApp(App).use(store).mount('#app')
