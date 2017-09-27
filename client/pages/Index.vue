<template>
    <div>
        <template v-for="station in stations">
            <station v-bind:station="station"></station>
        </template>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import Station from '../components/Station.vue'

    export default {
        name: 'index',
        computed: {
            ...mapState('stations', ['stations'])
        },
        components: {
            Station
        }
    };
</script>