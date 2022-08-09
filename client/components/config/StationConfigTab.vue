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
import {mapState, mapGetters} from 'vuex';
import StationConfig from './StationConfig.vue'
import Station from '../../../common/api/Station';
import SocketEvents from '../../../common/ref/SocketEvents'

export default {
    name: 'StationConfigTab',
    components: { StationConfig },
    computed: {
        ...mapGetters('stations', ['getStationById']),
        ...mapState('stations', ['stations'])
    },
    methods: {
        newTab() {
            console.log(this.stations)
            let stationCount = this.stations.length
            let stationId = "station" + stationCount
            while (this.getStationById(stationId)) {
                stationCount++
                stationId = "station" + stationCount
            }
            this.$socket.emit(SocketEvents.Stations.ADD_STATION, new Station(stationId, "Station " + stationCount, [], null, null, null, null, null, null))
        }
    }
}
</script>