<template>
    <div>
        <b-row class="mb-2">
            <b-col cols="auto">
                <b-button v-b-toggle.station-filter-sidebar>{{ $t('stations.filters.title') }}</b-button>
            </b-col>
            <b-col>
                <b-button @click="resetFilters">{{ $t('stations.filters.reset') }}</b-button>
            </b-col>
        </b-row>
        <template v-for="station in this.filteredStations">
            <b-row>
                <b-col>
                    <station v-bind:station="station"></station>
                </b-col>
            </b-row>
        </template>
        <b-sidebar id="station-filter-sidebar" :title="$t('stations.filters.title')" lazy backdrop shadow="true">
            <b-container>
                <b-form-group
                    :label="$t('stations.filters.statusFilter')"
                    label-for="stationStatusFilter">
                    <b-form-checkbox-group id="stationStatusFilter" v-model="selectedStates" stacked>
                        <template v-for="status in this.StationStatus">
                            <b-form-checkbox :value="status">{{ getLocalizedStationStatus(status) }}</b-form-checkbox>
                        </template>
                    </b-form-checkbox-group>
                </b-form-group>

                <b-form-group
                    :label="$t('stations.filters.consoleFilter')"
                    label-for="stationConsoleFilter">
                    <b-form-checkbox-group id="stationConsoleFilter" v-model="selectedConsoles" stacked>
                        <template v-for="console in this.consoles">
                            <b-form-checkbox :value="console.id">{{ console.name }}</b-form-checkbox>
                        </template>
                    </b-form-checkbox-group>
                </b-form-group>

                <b-button @click="resetFilters">{{ $t('stations.filters.reset') }}</b-button>
            </b-container>
        </b-sidebar>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import Station from '../components/Station.vue'
import StationStatusMixin from '../mixins/StationStatusMixin'

export default {
    name: 'index',
    mixins: [StationStatusMixin],
    data() {
        return {
            selectedStates: [],
            selectedConsoles: []
        }
    },
    computed: {
        ...mapState('stations', ['stations']),
        ...mapState('consoles', ['consoles']),
        filteredStations() {
            let filteredStations = this.stations
            if (this.selectedStates.length > 0)
                filteredStations = filteredStations
                    .filter(s => this.selectedStates.includes(s.status))
            if (this.selectedConsoles.length > 0)
                filteredStations = filteredStations
                    .filter(s => s.consoleOptions.some(co => this.selectedConsoles.includes(co)))
            return filteredStations
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
}
</script>