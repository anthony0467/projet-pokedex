<script>
import clearButton from './buttons/clearButton.vue';

export default {
    name: "cardPokemon",
    components: {
        clearButton
    },
      props: {
        apiResponse: {
            type: null
        },
        
        selectedItem:{
           
        },
        showTable:{
            type: Boolean,
            required: true,
            default: false
        },

        clear: {
            type: Function,
            required: true,
         },
         color: {
            type: String,
            default: 'white'
    },

    },

    data() {
        return {
            effect: 'effet',
          
        }
    },

  
   
}



</script>

<template>

    <div :class="effect" class="flex-row-center txt-center relative pad-top">
        <div>
            <img :src="selectedItem?.image" :alt="selectedItem?.name" :title="selectedItem?.name">
        </div>
        <div class="flex-column-center">
            <h3 :class="color">{{ selectedItem?.name }}</h3>
            <div :class="color"><span>Types: {{ selectedItem?.apiTypes?.[0].name}}</span><span v-if="selectedItem?.apiTypes?.[1]?.name"> - {{
                selectedItem.apiTypes?.[1].name
            }}</span></div>
            <ul>
                <li :class="color" v-for="(value, key) in selectedItem?.stats">{{ key.toUpperCase().charAt(0) + key.slice(1).replaceAll('_', ' ') }} : {{ value }}</li>
            </ul>
        </div>
        <div class="flex-column-center">
            <p :class="color" style="font-weight: bold">Génération : {{ selectedItem?.apiGeneration }}</p>
            <ul>
                <li style="padding: 0.2rem 0; border-radius: 20px; margin: .1rem" :class="[Resist?.damage_multiplier >= 2 ? 'bg-red' : Resist?.damage_multiplier == 1 ? 'bg-grey' : 'bg-green']" v-for="Resist in selectedItem?.apiResistances">
                 {{ Resist?.name }} - {{ Resist?.damage_multiplier }}  - {{Resist?.damage_relation}} 
                </li>
            </ul>
        </div>

        <clearButton :apiResponse="apiResponse" @clearArray="clear" /> <!--Bouton supprimer la fiche détaillé-->

    </div>
</template>

<style scoped>
@media screen and (min-width: 750px) {
    .flex-row-center {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .relative {
        position: relative;
    }

}

@media screen and (min-width: 1200px) {
    ul {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
}


h3 {
    font-weight: bold;
    padding: 1rem 0;
    font-size: 24px;
}


.effet{
  animation-duration: 1.25s;
  animation-name: slidein;
}

@keyframes slidein {
  from {

    transform: translateY(-100%);
   
  }

  to {
   
     transform: translateX(0);

  }
}


.bg-red {
    background-color: #f71818cc;
}

.bg-grey {
    background-color: rgb(161 160 160 / 60%);
}

.bg-green {
    background-color: rgb(22 205 22 / 57%);
}

.txt-center {
    text-align: center;
}

.dsp-none {
    display: none;
}

.pad-top {
    padding-top: 4rem;
}
</style>