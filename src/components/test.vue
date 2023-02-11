<script>
export default {
    props: {
        apiResponse: {
            type: Array,
            required: true,
            default: () => []
        }
    },

    data() {
        return {

        }
    },
    computed: {
        pokName() {
            return this.apiResponse.map((api) => api.name)[0];
        },
        pokImage() {
            return this.apiResponse.map((api) => api.image)[0];
        },
        pokType() {
            return this.apiResponse.map((api) => Object.values(api.apiTypes))[0];
        },
        pokStats() {
            return this.apiResponse.map((api) => Object.entries(api.stats))[0];
        },
        pokGen(){
            return this.apiResponse.map((api) => api.apiGeneration)[0]
        },
        pokResists(){
            return this.apiResponse.map((api) => Object.entries(api.apiResistances))[0]
        }

    }


}

</script>

<template>
    <div class="flex-row-center txt-center">
        <div>
            <img :src="pokImage" :alt="pokName" :title="pokName">
        </div>
        <div class="flex-column-center">
            <h3>{{ pokName }}</h3>
            <span>Types: {{ pokType[0].name }} - {{ pokType[1].name !== undefined ? pokType[1].name : 'dsp-none' }}</span>
            <ul>
                <li v-for="pokStat in pokStats">{{ pokStats }}:</li>
            </ul>
        </div>
        <div class="flex-column-center">
            <p style="font-weight: bold">Génération : {{ pokGen }}</p>
            <ul>
                <li v-for="pokResist in pokResists"> {{ pokResist[1].name }} - {{ pokResist[1].damage_multiplier }} - {{ pokResist[1].damage_relation }} </li>
            </ul>
        </div>
    </div>

</template>

<style scoped>

@media screen and (min-width: 750px) {
    .flex-row-center {
    display: flex;
    flex-direction: row;
    justify-content: center;
}
}
@media screen and (min-width: 1200px) {
    ul{
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
}


h3{
    font-weight: bold;
    padding: 1rem 0;
    font-size: 24px;
}

.txt-center{
    text-align: center;
}
.dsp-none{
    display: none;
}

.flex-column-center{
    justify-content: center;
    display: flex;
    flex-direction: column;
}
</style>