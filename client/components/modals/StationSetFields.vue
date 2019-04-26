<template>
    <b-form @submit="handleSubmit">
        <b-modal :id="'set-fields-' + station.id" ref="setFields"
                 :title="$t('stations.setFields.title', {stationName: station.stationName})"
                 size="lg"
                 @shown="onShow"
                 @ok="handleOk">

            <b-form-group id="playerNameInputGroup"
                          label-for="playerNameInput"
                          :label="$t('stations.fields.playerName.label')"
                          :description="$t('stations.fields.playerName.description')">
                <b-form-input type="text"
                              id="playerNameInput"
                              :placeholder="$t('stations.fields.playerName.placeholder')"
                              v-model="playerName"></b-form-input>
            </b-form-group>
            <b-form-group id="consoleSelectGroup"
                          label-for="consoleSelect"
                          :label="$t('stations.fields.currentConsole.label')"
                          :description="$t('stations.fields.currentConsole.description')">
                <b-form-select id="consoleSelect"
                               :options="consoleOptions"
                               v-model="currentConsole"></b-form-select>
            </b-form-group>
            <b-form-group id="consoleGameGroup"
                          label-for="currentGame"
                          :label="$t('stations.fields.currentGame.label')"
                          :description="$t('stations.fields.currentGame.description')">
                <b-form-select id="currentGame"
                               :options="currentGameOptions"
                               v-model="currentGame"></b-form-select>
            </b-form-group>
            <b-form-checkbox name="overrideCheckoutTimeEnable" v-model="overrideTime" switch>
                {{$t('stations.fields.overrideCheckoutTimeEnable.label')}}
            </b-form-checkbox>
            <b-form-group id="checkoutTimeGroup"
                          label-for="checkoutTime"
                          :label="$t('stations.fields.checkoutTime.label')"
                          :description="$t('stations.fields.checkoutTime.description')"
                          v-if="overrideTime">
                <b-form-input type="datetime-local"
                              id="checkoutTime"
                              v-model="currentTime"/>
            </b-form-group>
            <template slot="modal-footer">
                <b-button @click="hide" variant="secondary">{{ $t('forms.actions.cancel') }}</b-button>
                <b-button type="submit" variant="primary">{{ $t('forms.actions.submit') }}</b-button>
            </template>
        </b-modal>
    </b-form>
</template>

<script>
    import {mapState} from 'vuex'
    import SocketEvents from '../../../common/ref/SocketEvents'
    import timeUtils from '../../util/timeUtils'

    export default {
        name: 'station-set-fields',
        props: ['station'],
        data() {
            return {
                playerName: this.station.playerName,
                currentConsole: this.station.currentConsole,
                currentGame: this.station.currentGame,
                overrideTime: false,
                currentTime: timeUtils.dateTimeFormat(this.station.checkoutTime)
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
                        return state.consoles[this.currentConsole].games.sort().map(g => {
                            return {
                                value: g,
                                text: g
                            }
                        })
                }
            })
        },
        methods: {
            show() {
                this.onShow()
                this.$refs.setFields.show()
            },
            onShow() {
                this.playerName = this.station.playerName
                this.currentConsole = this.station.currentConsole
                this.currentGame = this.station.currentGame
                this.currentTime = timeUtils.dateTimeFormat(this.station.checkoutTime)
            },
            hide() {
                this.$refs.setFields.hide()
                this.overrideTime = false;
            },
            handleOk(e) {
                e.cancel()
                this.handleSubmit()
            },
            handleSubmit(e) {
                if (e) e.preventDefault()
                this.$socket.emit(SocketEvents.Stations.UPDATE_STATION_FIELDS, {
                    id: this.station.id,
                    playerName: this.playerName,
                    currentConsole: this.currentConsole,
                    currentGame: this.currentGame,
                    checkoutTime: this.currentTime
                })
                this.hide()
            }
        }
    }
</script>