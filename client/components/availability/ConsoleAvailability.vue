<template>
    <b-card :header="console.name" no-body class="mb-3">
        <b-card-body>
            <b-card-text>{{$t('availability.consoles.total', {count: stationsWithConsole.length})}}</b-card-text>
            <b-card-text v-if="stationsWithConsoleStatus(StationStatus.DEFAULT).length > 0">{{$t('availability.consoles.available', {count: stationsWithConsoleStatus(StationStatus.DEFAULT).length})}}</b-card-text>
            <b-card-text v-else>{{$t('availability.consoles.timeUntil', {time: timeToNextConsole})}}</b-card-text>
            <b-card-text v-if="outOfTimeStations.length > 0">{{$t('availability.consoles.needToBeKicked', {stations: outOfTimeStations})}}</b-card-text>
        </b-card-body>
        <b-list-group flush v-for="game in console.games">
            <b-list-group-item>
                <game-availability :console-id="console.id" :game="game"></game-availability>
            </b-list-group-item>
        </b-list-group>
    </b-card>
</template>

<script>
    import moment from 'moment'
    import {mapState, mapGetters} from 'vuex';
    import StationStatusMixin from '../../mixins/StationStatusMixin'
    import StationStatus from '../../../common/api/StationStatus'
    import StationUtils from '../../mixins/StationUtils'
    import timeUtils from '../../util/timeUtils'
    import GameAvailability from './GameAvailability'

    export default {
        name: 'ConsoleAvailability',
        components: {GameAvailability},
        mixins: [StationStatusMixin, StationUtils],
        props: [ 'console' ],
        created() {
            this.update()
            setInterval(this.update, 1000)
        },
        destroyed() {
            clearInterval(this.update)
        },
        data() {
            return {
                timeToNextConsole: timeUtils.formatDurationFormat(moment.duration(0, 'milliseconds')),
                outOfTimeStations: ''
            }
        },
        computed: {
            stationsWithConsole() {
                return this.getStationByConsoleOptions()(this.console.id)
            },
            ...mapState('stations', ['stations']),
            ...mapState(['times'])
        },
        methods: {
            stationsWithConsoleStatus(status) {
                return this.getStationByConsoleOptions()(this.console.id).filter(station => station.status === status)
            },
            update() {
                this.getTimeToNextConsole()
                this.getOutOfTimeConsoles()
            },
            getTimeToNextConsole() {
                let checkedOutStations = this.stationsWithConsoleStatus(StationStatus.CHECKED_OUT)
                    .sort((a, b) => a.timeSinceCheckout().asMilliseconds() < b.timeSinceCheckout().asMilliseconds() ? 1 : -1)
                let durationToConsole =  moment.duration(0, 'milliseconds')
                if (checkedOutStations.length > 0) {
                    let milliToNextConsole = Math.max(this.times.kickOff.clone().subtract(checkedOutStations[0].timeSinceCheckout()).asMilliseconds(), 0)
                    durationToConsole = moment.duration(milliToNextConsole, 'milliseconds')
                }
                this.timeToNextConsole =  timeUtils.formatDurationFormat(durationToConsole)
            },
            getOutOfTimeConsoles() {
                this.outOfTimeStations = this.getOutOfTimeStations()
                    .filter(station => station.consoleOptions.includes(this.console.id))
                    .map(station => station.stationName)
                    .join(', ')
            },
            ...mapGetters('stations', ['getStationByConsoleOptions'])
        }
    }
</script>

<style scoped>

</style>