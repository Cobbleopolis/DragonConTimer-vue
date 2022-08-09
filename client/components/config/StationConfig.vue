<template>
    <div>
        <b-form @submit="save">
            <b-form-group :id="'stationId' + station.id"
                          :label-for="'stationIdInput' + station.id"
                          :label="$t('stations.fields.id.label')"
                          :description="$t('stations.fields.id.description')">
                <b-form-input type="text"
                              :id="'stationIdInput' + station.id"
                              :placeholder="$t('stations.fields.id.placeholder')"
                              v-model="stationData.id"/>
            </b-form-group>
            <b-form-group :id="'stationName' + station.id"
                          :label-for="'stationNameInput' + station.id"
                          :label="$t('stations.fields.stationName.label')"
                          :description="$t('stations.fields.stationName.description')">
                <b-form-input type="text"
                              :id="'stationNameInput' + station.id"
                              :placeholder="$t('stations.fields.stationName.placeholder')"
                              v-model="stationData.stationName"/>
            </b-form-group>
            <b-form-group :id="'stationConsoleOptionsName' + station.id"
                          :label-for="'stationConsoleOptionsInput' + station.id"
                          :label="$t('stations.fields.consoleOptions.label')"
                          :description="$t('stations.fields.consoleOptions.description')">
                <b-form-checkbox-group :id="'stationConsoleOptionsInputGroup' + station.id"
                                       :options="consoleOptions"
                                       v-model="stationData.consoleOptions"/>
            </b-form-group>
            <b-button type="submit" @click="save" variant="primary">{{$t('forms.actions.save')}}</b-button>
            <b-button @click="deleteStation()" variant="danger">{{$t('forms.actions.delete')}}</b-button>
        </b-form>
    </div>
</template>

<script>
import SocketEvents from '../../../common/ref/SocketEvents'
import {mapState} from 'vuex'

export default {
    name: 'StationConfig',
    props: ['station'],
    data() {
        return {
            originalId: this.station.id,
            stationData: JSON.parse(JSON.stringify(this.station))
        }
    },
    computed: {
        ...mapState('consoles', ['consoles']),
        consoleOptions() {
            return Object.values(this.consoles).map(c => { return {value: c.id, text: c.name}})
        }
    },
    methods: {
        save(e) {
            if (e)
                e.preventDefault()
            this.$socket.emit(SocketEvents.Stations.UPDATE_STATION_FIELDS, {id: this.originalId, fields: this.stationData})
        },
        deleteStation() {
            this.$socket.emit(SocketEvents.Stations.DELETE_STATION, this.originalId)
        }
    }
}
</script>