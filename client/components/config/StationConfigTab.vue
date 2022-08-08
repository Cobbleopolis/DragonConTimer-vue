<template>
    <b-tabs pills card vertical>
        <b-tab v-for="station in stations" :key="station.id" :title="station.stationName">
            <station-config :station="station"/>
        </b-tab>
        <template #tabs-end>
            <b-button role="presentation" @click.prevent="newTab" href="#"><b>+</b></b-button>
        </template>
    </b-tabs>
    
</template>

<script>
import {mapState} from 'vuex';
import StationConfig from './StationConfig.vue'

export default {
    name: 'StationConfigTab',
    components: { StationConfig },
    computed: {
        ...mapState('stations', ['stations'])
    },
    methods: {
        newTab() {
            let newId = prompt('New Station Id')
            if (newId) {
                newId = newId.toLowerCase()
                console.log(newId)
            }
        }
    }
}
</script>