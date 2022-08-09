<template>
    <b-tabs pills card vertical>
        <b-tab v-for="console in consoles" :key="console.id" :title="console.name">
            <console-config :console="console"/>
        </b-tab>
        <template #tabs-end>
            <b-button role="presentation" @click.prevent="newTab" href="#"><b>+</b></b-button>
        </template>
    </b-tabs>
    
</template>

<script>
import ConsoleConfig from './ConsoleConfig.vue'
import {mapState} from 'vuex';
//import Station from '../../../common/api/Station';
import Console from '../../../common/api/Console';
import SocketEvents from '../../../common/ref/SocketEvents'

export default {
    name: 'ConsoleConfigTab',
    components: {ConsoleConfig},
    computed: {
        ...mapState('consoles', ['consoles'])
    },
    methods: {
        newTab() {
            let consoleCount = Object.keys(this.consoles).length
            this.$socket.emit(SocketEvents.Consoles.ADD_CONSOLE, new Console("console" + consoleCount, "Console " + consoleCount, [], ''))
        }
    }
}
</script>