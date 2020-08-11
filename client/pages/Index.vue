<template>
    <div>
        <p>{{selectedStates}}</p>
        <p>{{selectedConsoles}}</p>
        <template v-for="station in this.filteredStations">
            <station v-bind:station="station"></station>
        </template>
        <b-sidebar id="station-filter-sidebar" title="Filters" no-slide visible="true">
            <b-select v-model="selectedStates" :options="filterStateOptions" multiple/>
            <b-select v-model="selectedConsoles" :options="filterConsoleOptions" multiple/>
            <b-button @click="resetFilters">Reset Filters</b-button>
        </b-sidebar>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import Station from '../components/Station.vue'
    import StationStatusMixin from '../mixins/StationStatusMixin'

    export default {
        name: 'index',
        mixins: [StationStatusMixin],
        data() {
            return {
                filterStateOptions: Object.values(this.StationStatus).map(s => {
                    return {
                        value: s,
                        text: this.getLocalizedStationStatus(s)
                    }
                }),
                selectedStates: [],
                selectedConsoles: []
            }
        },
        computed: {
            ...mapState('stations', ['stations']),
            ...mapState('consoles', ['consoles']),
            filterConsoleOptions() {
                return Object.keys(this.consoles).map(k => {
                    return {
                        value: k,
                        text: this.consoles[k].name
                    }
                })
            },
            filteredStations() {
                let filteredStations = this.stations
                if (this.selectedStates.length > 0)
                filteredStations = filteredStations
                    .filter(s => this.selectedStates.includes(s.status))
                if (this.selectedConsoles.length > 0)
                    filteredStations = filteredStations
                        .filter(s => s.consoleOptions.some(co => this.selectedConsoles.includes(co)))
                return filteredStations;
            }
        },
        methods: {
            resetFilters() {
                this.selectedStates = []
                this.selectedConsoles = []
            }
        },
        components: {
            Station
        }
    };
</script>