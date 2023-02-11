<script>
import clearButton from './buttons/clearButton.vue';

export default {
    components: {
        clearButton
    },

    props: {
        emptyArray: {
            type: Array,
            required: true,
            default: () => []
        }
    },

    data() {
        return {
            effect: ''
        }
    },
    methods: {
        clear() {
            this.emptyArray.splice(0, 1) // effacer ma fiche détaillé sur le bouton
        }
    },
    computed: {
        pokName() {
            return this.emptyArray.map((api) => api.name);  // NOM du POKEMON
        },
        pokImage() {
            return this.emptyArray.map((api) => api.image); // IMAGE DU POKEMON
        },
        pokType() {
            return this.emptyArray.map((api) => Object.values(api.apiTypes)); // TYPES DU POKEMON
        },
        pokStats() {
            return this.emptyArray.map((api) => Object.entries(api.stats)).flat(); // STATS DU POKEMON CLE ET VALEURS
        },
        changeCara() { // enlevé les _ pour les noms des stats
            return this.pokStats.map((api) => `${api[0].replaceAll('_', ' ')}: ${api[1]}`)
        },
        majCara() { // majuscule 
            return this.changeCara.map((api) => api.charAt().toUpperCase() + api.slice(1))
        },

        pokGen() {
            return this.emptyArray.map((api) => api.apiGeneration) // POKEMON GENERATION
        },
        pokResists() {
            return this.emptyArray.map((api) => Object.entries(api.apiResistances)).flat() // RESISTANCE POKEMON
        }

    }


}

</script>

<template>
    <div :class="effect" class="flex-row-center txt-center relative pad-top">
        <div>
            <img :src="pokImage" :alt="pokName" :title="pokName">
        </div>
        <div class="flex-column-center">
            <h3>{{ pokName[0] }}</h3>
            <div><span>Types: {{ pokType[0][0].name }}</span><span v-if="pokType[0].length > 1"> - {{
                pokType[0][1].name
            }}</span></div>
            <ul>
                <li v-for="pokStat in majCara" :key="pokStat">{{ pokStat }}</li>
            </ul>
        </div>
        <div class="flex-column-center">
            <p style="font-weight: bold">Génération : {{ pokGen[0] }}</p>
            <ul>
                <li style="padding: 0.2rem 0"
                    :class="[pokResist[1].damage_multiplier == 2 ? 'bg-red' : pokResist[1].damage_multiplier == 1 ? 'bg-grey' : 'bg-green']"
                    v-for="pokResist in pokResists"> {{ pokResist[1].name }} - {{ pokResist[1].damage_multiplier }} - {{
                        pokResist[1].damage_relation}} 
                </li>
            </ul>
        </div>

        <clearButton :emptyArray="emptyArray" @clearArray="clear" /> <!--Bouton supprimer la fiche détaillé-->

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

.bg-red {
    background-color: red;
}

.bg-grey {
    background-color: rgba(161, 160, 160, 0.815);
}

.bg-green {
    background-color: rgb(14, 174, 14);
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