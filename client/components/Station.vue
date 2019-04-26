<template>
    <b-card :header="station.stationName" header-tag="h6" class="mb-3" :border-variant="borderVariant"
            :header-border-variant="borderVariant">
        <div class="container-fluid">
            <div class="row mb-1">
                <div class="col-12">
                    <p class="card-text">{{ station }}</p>
                </div>
            </div>
            <div class="row mb-1">
                <div class="col-12">
                    <p>{{$t('stations.fields.timeSinceCheckout.label')}}: <span v-if="timeSinceCheckout">{{timeSinceCheckout}}</span><span
                            v-else>{{$t('data.invalidDuration')}}</span></p>
                </div>
            </div>
            <b-form inline class="row justify-content-between">
                <b-form-group id="playerNameInputGroup"
                              label-for="playerNameInput"
                              labelCols="auto"
                              labelClass="mr-2"
                              :label="$t('stations.fields.playerName.label')">
                    <b-form-input type="text"
                                  id="playerNameInput"
                                  readonly
                                  v-model="station.playerName"
                                  class="input-horizontal"></b-form-input>
                </b-form-group>
                <b-form-group id="currentConsoleInputGroup"
                              label-align="center"
                              labelCols="auto"
                              labelClass="mx-2"
                              label-for="currentConsoleInput"
                              :label="$t('stations.fields.currentConsole.label')">
                    <b-form-input type="text"
                                  id="currentConsoleInput"
                                  readonly
                                  v-model="fullConsoleName"></b-form-input>
                </b-form-group>
                <b-form-group id="currentGameInputGroup"
                              class="mr-auto"
                              labelCols="auto"
                              labelClass="mx-2"
                              label-align="center"
                              label-for="currentGameInput"
                              :label="$t('stations.fields.currentGame.label')">
                    <b-form-input type="text"
                                  id="currentGameInput"
                                  readonly
                                  v-model="station.currentGame"></b-form-input>
                </b-form-group>
                <div class="col-auto">
                    <b-dropdown :text="$t('stations.actions.title')" class="float-right" variant="primary">
                        <b-dropdown-item-button @click="showSetFields">
                            {{ $t('stations.actions.setFields') }}
                        </b-dropdown-item-button>
                        <b-dropdown-item-button>
                            {{ $t('stations.actions.setState') }}
                        </b-dropdown-item-button>
                    </b-dropdown>
                </div>
            </b-form>
        </div>
        <station-set-fields ref="setFieldsModal" :station="station"></station-set-fields>
    </b-card>
</template>

<script>
    import StationSetFields from './modals/StationSetFields.vue'
    import moment from 'moment'
    import timeUtils from '../util/timeUtils'
    import {mapGetters} from 'vuex'

    export default {
        components: {StationSetFields},
        name: 'station',
        props: ['station'],
        created() {
            this.getTimeFromNow()
            setInterval(this.getTimeFromNow, 1000)
        },
        destroyed() {
            clearInterval(this.getTimeFromNow)
        },
        data() {
            return {
                timeSinceCheckout: null
            }
        },
        computed: {
            borderVariant() {
                switch (this.station.status) {
                    case 'DEFAULT':
                        return 'default'
                        break
                    default:
                        return 'default'
                        break
                }
            },
            fullConsoleName: {
                get() {
                    if (!this.station.currentConsole || !this.getConsoleById()(this.station.currentConsole))
                        return ''
                    return this.getConsoleById()(this.station.currentConsole).name
                },
                set(newValue) {
                }
            }
        },
        methods: {
            showSetFields() {
                this.$refs.setFieldsModal.show()
            },
            getTimeFromNow() {
                this.timeSinceCheckout = timeUtils.formatDurationFormat(moment.duration(moment(moment.now()).diff(this.station.checkoutTime)))
            },
            getConsoleName(event, value) {
                if (!value || !this.getConsoleById(value))
                    return ''
                return this.getConsoleById(value).name
            },
            ...mapGetters('consoles', {
                getConsoleById: 'getById'
            })
        }
    }
</script>

<style lang="sass">

</style>