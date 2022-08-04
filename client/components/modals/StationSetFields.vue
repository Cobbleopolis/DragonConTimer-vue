<template>
    <b-form @submit="handleSubmit">
        <b-modal :id="'set-fields-' + station.id" ref="setFields"
                 :title="$t('stations.setFields.title', {stationName: station.stationName})"
                 size="lg"
                 centered
                 :return-focus="returnFocus"
                 @shown="onShow">

            <b-form-group :id="'playerNameInputGroup' + station.id"
                          :label-for="'playerNameInput' + station.id"
                          :label="$t('stations.fields.playerName.label')"
                          :description="$t('stations.fields.playerName.description')">
                <b-form-input type="text"
                              :id="'playerNameInput' + station.id"
                              :placeholder="$t('stations.fields.playerName.placeholder')"
                              v-model="playerName"
                              autofocus/>
            </b-form-group>
            <b-form-group :id="'consoleSelectGroup' + station.id"
                          :label-for="'consoleSelectInput' + station.id"
                          :label="$t('stations.fields.currentConsole.label')"
                          :description="$t('stations.fields.currentConsole.description')">
                <b-form-select :id="'consoleSelectInput' + station.id"
                               :options="consoleOptions"
                               v-model="currentConsole"/>
            </b-form-group>
            <b-form-group :id="'consoleGameGroup' + station.id"
                          :label-for="'currentGameInput' + station.id"
                          :label="$t('stations.fields.currentGame.label')"
                          :description="$t('stations.fields.currentGame.description')">
                <b-form-select :id="'currentGameInput' + station.id"
                               :options="currentGameOptions"
                               v-model="currentGame"/>
            </b-form-group>
            <b-form-group :id="'consoleNoteGroup' + station.id"
                          :label-for="'consoleNotesInput' + station.id"
                          :label="$t('stations.fields.notes.label')"
                          :description="$t('stations.fields.notes.description')">
                <b-form-textarea :id="'consoleNotesInput' + station.id"
                                 :placeholder="$t('stations.fields.notes.placeholder')"
                                 v-model="currentNotes"/>
            </b-form-group>
            <b-form-checkbox name="overrideCheckoutTimeEnable" v-model="overrideTime" switch
                             v-if="overrideStatus !== this.StationStatus.CHECKED_OUT">
                {{ $t('stations.fields.overrideCheckoutTimeEnable.label') }}
            </b-form-checkbox>
            <b-form-group id="checkoutTimeGroup"
                          label-for="checkoutTimeInput"
                          :label="$t('stations.fields.checkoutTime.label')"
                          :description="$t('stations.fields.checkoutTime.description')"
                          v-if="overrideTime">
                <b-form-input type="datetime-local"
                              id="checkoutTimeInput"
                              v-model="currentTime"/>
            </b-form-group>
            <template slot="modal-footer">
                <b-button @click="hide" variant="secondary">{{ $t('forms.actions.cancel') }}</b-button>
                <b-button type="submit" @click="handleSubmit" variant="primary">{{
                        $t('forms.actions.submit')
                    }}
                </b-button>
            </template>
        </b-modal>
    </b-form>
</template>

<script>
import moment from 'moment'
import {mapState} from 'vuex'
import SocketEvents from '../../../common/ref/SocketEvents'
import timeUtils from '../../util/timeUtils'
import StationStatusMixin from '../../mixins/StationStatusMixin'

export default {
    name: 'station-set-fields',
    props: ['station', 'returnFocus'],
    mixins: [StationStatusMixin],
    data() {
        return {
            playerName: this.station.playerName,
            currentConsole: this.station.currentConsole,
            currentGame: this.station.currentGame,
            currentNotes: this.station.notes,
            overrideTime: false,
            currentTime: timeUtils.dateTimeFormat(this.station.checkoutTime ? this.station.checkoutTime : moment(moment.now())),
            overrideStatus: null
        }
    },
    computed: {
        ...mapState('consoles', {
            consoleOptions(state) {
                return this.station.consoleOptions.map(opt => {
                    return {
                        value: opt,
                        text: (state.consoles[opt] && state.consoles[opt].name) ? state.consoles[opt].name : opt
                    }
                })
            },
            currentGameOptions(state) {
                if (!this.currentConsole || !state.consoles[this.currentConsole])
                    return {}
                else
                    return state.consoles[this.currentConsole].games.map(g => {
                        return {
                            value: g.name,
                            text: g.name
                        }
                    })
            }
        })
    },
    methods: {
        show(overrideStatus) {
            this.onShow()
            this.$refs.setFields.show()
            this.overrideStatus = overrideStatus
        },
        onShow() {
            this.playerName = this.station.playerName
            this.currentConsole = this.station.currentConsole
            this.currentGame = this.station.currentGame
            this.currentNotes = this.station.notes
            this.currentTime = timeUtils.dateTimeFormat(moment(moment.now()))
            if (this.station.consoleOptions.length === 1)
                this.currentConsole = this.station.consoleOptions[0]
            if (this.currentConsole && this.currentConsole.length > 0 && this.currentGameOptions.length === 1)
                this.currentGame = this.currentGameOptions[0].value
        },
        hide() {
            this.$nextTick(() => {
                this.$refs.setFields.hide()
                this.overrideTime = false
                this.overrideStatus = null
            })
        },
        handleSubmit(e) {
            if (e) e.preventDefault()
            this.$socket.emit(SocketEvents.Stations.UPDATE_STATION_FIELDS, {
                id: this.station.id,
                playerName: this.playerName,
                currentConsole: this.currentConsole,
                currentGame: this.currentGame,
                checkoutTime: (this.overrideStatus === this.StationStatus.CHECKED_OUT) ? moment(moment.now()) : this.currentTime
            })
            this.$socket.emit(SocketEvents.Stations.EDIT_NOTES, {
                id: this.station.id,
                notes: this.currentNotes
            })
            if (this.overrideStatus) {
                this.$socket.emit(SocketEvents.Stations.UPDATE_STATION_STATUS, {
                    id: this.station.id,
                    status: this.overrideStatus
                })
            }
            this.hide()
        }
    }
}
</script>