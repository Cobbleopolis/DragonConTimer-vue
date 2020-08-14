<template>
    <div>
        <b-card-text>{{game.name}}: {{copiesAvailable}}/{{game.count}}</b-card-text>
        <b-card-text v-if="copiesAvailable <= 0">{{$t('availability.games.availableIn', {time: timeToNextGame})}}</b-card-text>
        <b-card-text v-if="outOfTimeStations.length > 0">{{$t('availability.games.needToBeKicked', {stations: outOfTimeStations})}}</b-card-text>
    </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex';
import moment from 'moment';
import timeUtils from '../../util/timeUtils';
import StationUtils from '../../mixins/StationUtils'

export default {
    name: 'GameAvailability',
    props: [ 'consoleId', 'game' ],
    mixins: [ StationUtils ],
    created() {
        this.update()
        setInterval(this.update, 1000)
    },
    destroyed() {
        clearInterval(this.update)
    },
    data() {
        return {
            timeToNextGame: timeUtils.formatDurationFormat(moment.duration(0, 'milliseconds')),
            outOfTimeStations: ''
        }
    },
    computed: {
        usedStations() {
            return this.getStationsByGame()(this.consoleId, this.game.name);
        },
        copiesAvailable() {
            return this.game.count - this.usedStations.length;
        },
        ...mapState(['times'])
    },
    methods: {
        ...mapGetters('stations', ['getStationsByGame']),
        update() {
            this.getTimeToNextGame()
            this.getOutOfTimeGames()
        },
        getTimeToNextGame() {
            let usedStationsSorted = this.usedStations
                .sort((a, b) => a.timeSinceCheckout().asMilliseconds() < b.timeSinceCheckout().asMilliseconds() ? 1 : -1)
            let durationToConsole =  moment.duration(0, 'milliseconds')
            if (usedStationsSorted.length > 0) {
                let milliToNextConsole = Math.max(this.times.kickOff.clone().subtract(usedStationsSorted[0].timeSinceCheckout()).asMilliseconds(), 0)
                durationToConsole = moment.duration(milliToNextConsole, 'milliseconds')
            }
            this.timeToNextGame =  timeUtils.formatDurationFormat(durationToConsole)
        },
        getOutOfTimeGames() {
            this.outOfTimeStations = this.getOutOfTimeStations()
                .filter(station => this.usedStations.includes(station))
                .map(station => station.stationName)
                .join(', ')
        }
    }
}
</script>

<style scoped>

</style>