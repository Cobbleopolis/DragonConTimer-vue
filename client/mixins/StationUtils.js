import {mapState, mapGetters} from 'vuex';

export default {
    computed: {
        ...mapState(['times'])
    },
    methods: {
        ...mapGetters('stations', ['stations']),
        getOutOfTimeStations() {
            return this.stations.filter(station =>
                station.timeSinceCheckout() &&
                station.timeSinceCheckout().asMilliseconds() >= this.times.kickOff.asMilliseconds()
            )
        }
    }
}