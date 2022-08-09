<template>
    <div>
        <p>{{station.id}}</p>
        <b-button v-on:click="deleteStation()" variant="danger">Delete</b-button>
    </div>
</template>

<script>
import SocketEvents from '../../../common/ref/SocketEvents'

export default {
    name: 'StationConfig',
    props: ['station'],
    methods: {
        deleteStation() {
            this.$socket.emit(SocketEvents.Stations.DELETE_STATION, this.station.id)
        }
    }
}
</script>