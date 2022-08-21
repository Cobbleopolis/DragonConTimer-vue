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
            <b-card class="mb-3" bg-variant="secondary">
                <b-form-group :id="'games' + console.id"
                            :label="$t('consoles.fields.games.label')"
                            label-size="lg">
                    <b-input-group v-for="(g, i) in this.consoleData.games" :key="'game' + i + console.id" :id="'game' + i + console.id" class="mb-2">
                        <b-form-input type="text"
                                    :id="'game' + i + 'nameInput' + console.id"
                                    :placeholder="$t('games.fields.name.label')"
                                    v-model="g.name"/>
                        <b-form-input type="number"
                                    :id="'game' + i + 'countInput' + console.id"
                                    :placeholder="$t('games.fields.count.label')"
                                    min="1"
                                    v-model="g.count"/>
                        <b-input-group-append>
                            <b-button variant="danger" @click="deleteGame(i)">{{$t('forms.actions.delete')}}</b-button>
                        </b-input-group-append>
                    </b-input-group>
                    <b-button @click="addGame" variant="primary">{{$t('forms.actions.add')}}</b-button>
                </b-form-group>
            </b-card>
            <b-button type="submit" @click="save" variant="primary">{{$t('forms.actions.save')}}</b-button>
            <b-button @click="deleteConsole()" variant="danger">{{$t('forms.actions.delete')}}</b-button>
        </b-form>
        <!-- <b-form-input v-model="this.console.name" placeholder="Console name"></b-form-input> -->
        
    </div>
    
</template>

<script>
import SocketEvents from '../../../common/ref/SocketEvents'
import Game from '../../../common/api/Game'

export default {
    name: 'ConsoleConfig',
    props: ['console'],
    data() {
        return {
            originalId: this.console.id,
            consoleData: JSON.parse(JSON.stringify(this.console))
        }
    },
    methods: {
        save(e) {
            if (e)
                e.preventDefault()
            let payload = { id: this.originalId, fields: this.consoleData }
            console.log(payload)
            this.$socket.emit(SocketEvents.Consoles.UPDATE_CONSOLE_FIELDS, payload)
        },
        addGame() {
            this.consoleData.games.push(new Game('', 1))
        },
        deleteGame(i) {
            this.$delete(this.consoleData.games, i)
        },
        deleteConsole() {
            this.$socket.emit(SocketEvents.Consoles.DELETE_CONSOLE, this.originalId)
        }
    }
}
</script>