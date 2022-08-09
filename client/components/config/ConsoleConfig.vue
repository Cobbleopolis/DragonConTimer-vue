<template>
    <div>
        <b-form @submit="save">
            <b-form-group :id="'consoleId' + console.id"
                          :label-for="'consoleIdInput' + console.id"
                          :label="$t('consoles.fields.id.label')"
                          :description="$t('consoles.fields.id.description')">
                <b-form-input type="text"
                              :id="'consoleIdInput' + console.id"
                              :placeholder="$t('consoles.fields.id.placeholder')"
                              v-model="consoleData.id"/>
            </b-form-group>
            <b-form-group :id="'consoleName' + console.id"
                          :label-for="'consoleNameInput' + console.id"
                          :label="$t('consoles.fields.name.label')"
                          :description="$t('consoles.fields.name.description')">
                <b-form-input type="text"
                              :id="'consoleNameInput' + console.id"
                              :placeholder="$t('consoles.fields.name.placeholder')"
                              v-model="consoleData.name"/>
            </b-form-group>
            <b-form-group :id="'checkoutWarning' + console.id"
                          :label-for="'checkoutWarningInput' + console.id"
                          :label="$t('consoles.fields.checkoutWarning.label')"
                          :description="$t('consoles.fields.checkoutWarning.description')">
                <b-form-input type="text"
                              :id="'checkoutWarningInput' + console.id"
                              :placeholder="$t('consoles.fields.checkoutWarning.placeholder')"
                              v-model="consoleData.checkoutWarning"/>
            </b-form-group>
            <p class="text-info">TODO - The ability to manage games</p>
            <b-button type="submit" @click="save" variant="primary">Save</b-button>
            <b-button v-on:click="deleteConsole()" variant="danger">Delete</b-button>
        </b-form>
        <!-- <b-form-input v-model="this.console.name" placeholder="Console name"></b-form-input> -->
        
    </div>
    
</template>

<script>
import SocketEvents from '../../../common/ref/SocketEvents'

export default {
    name: 'ConsoleConfig',
    props: ['console'],
    data() {
        return {
            originalId: this.console.id,
            consoleData: {...this.console}
        }
    },
    methods: {
        save(e) {
            console.log("CLICK")
            if (e)
                e.preventDefault()
            let payload = { id: this.originalId, fields: this.consoleData }
            console.log(payload)
            this.$socket.emit(SocketEvents.Consoles.UPDATE_CONSOLE_FIELDS, payload)
        },
        deleteConsole() {
            this.$socket.emit(SocketEvents.Consoles.DELETE_CONSOLE, this.originalId)
        }
    }
}
</script>