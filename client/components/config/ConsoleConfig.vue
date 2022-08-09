<template>
    <div>
        <p>{{console.id}}</p>
        <b-button v-on:click="deleteConsole()" variant="danger">Delete</b-button>
    </div>
    
</template>

<script>
import SocketEvents from '../../../common/ref/SocketEvents'

export default {
    name: 'ConsoleConfig',
    props: ['console'],
    methods: {
        deleteConsole() {
            this.$socket.emit(SocketEvents.Consoles.DELETE_CONSOLE, this.console.id)
        }
    }
}
</script>