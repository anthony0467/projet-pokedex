<script>
export default {
   
    methods: {
        clear() {
            this.$emit('clearArray')
        }
    }

}

</script>

<template>

    <div class="flex-column-center">
        <button class="absolut" @click="clear">Fermer</button>
    </div>

</template>

<style scoped>
@media screen and (min-width: 750px) {

    .absolut {
        position: absolute;
        top: 1.5rem;
        right: 0;
    }
}

div {
    justify-content: flex-start;
    margin-top: 1rem;
}

button {
    margin-right: 1rem;
}
</style>