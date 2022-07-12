<template>
    <b-modal :id="'editNotes' + station.id" ref="editNotesModal"
             :title="$t('stations.editNotes.title', {stationName: station.stationName})"
             size="lg" centered
             :ok-title="$t('forms.actions.submit')"
             :return-focus="returnFocus"
             @shown="onShow"
             @ok="handleOk">
        <b-form-group :id="'editStationNotesGroup' + station.id"
                      :label-for="'editStationNotes' + station.id"
                      :label="$t('stations.fields.notes.label')"
                      :description="$t('stations.fields.notes.description')">
            <b-form-textarea :id="'editStationNotes' + station.id"
                             :placeholder="$t('stations.fields.notes.placeholder')"
                             v-model="currentNotes"
                             autofocus/>
        </b-form-group>
    </b-modal>
</template>

<script>
//TODO Implement
import SocketEvents from '../../../common/ref/SocketEvents'

export default {
    name: 'edit-station-notes',
    props: ['station', 'returnFocus'],
    data() {
        return {
            currentNotes: this.station.notes
        }
    },
    methods: {
        show() {
            this.onShow()
            this.$refs.editNotesModal.show()
        },
        onShow() {
            this.currentNotes = this.station.notes
        },
        hide() {
            this.$nextTick(() => {
                this.$refs.editNotesModal.hide()
            })
        },
        handleOk(modalEvent) {
            if (modalEvent)
                modalEvent.preventDefault()
            this.$socket.emit(SocketEvents.Stations.EDIT_NOTES, {id: this.station.id, notes: this.currentNotes})
            this.hide()
        }
    }
}
</script>

<style scoped>

</style>