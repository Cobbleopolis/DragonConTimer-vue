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

export default {
    name: 'ConsoleConfigTab',
    components: {ConsoleConfig},
    computed: {
        ...mapState('consoles', ['consoles'])
    },
    methods: {
        newTab() {
            let newId = prompt('New Console Id')
            if (newId) {
                newId = newId.toLowerCase()
                console.log(newId)
            }
        }
    }
}
</script>