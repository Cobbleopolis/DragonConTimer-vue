<template>
    <h3>
        {{ $t('socket.status.label') }}
        <b-badge v-if="socketConnected" variant="success">{{ $t('socket.status.connected') }}</b-badge>
        <b-badge v-else variant="danger">{{ $t('socket.status.disconnected') }}</b-badge>
    </h3>
</template>

<script>
    import { mapState, mapActions, mapGetters } from 'vuex'

    export default {
        name: 'socket-status',
        sockets: {
            connect() {
                console.log("Connect");
                this.setSocketConnected(true)
            },
            disconnect() {
                console.log("Disconnect");
                this.setSocketConnected(false)
            }
        },
        methods: {
            ...mapActions(['setSocketConnected'])
        },
        computed: {
            ...mapState(['socketConnected'])
        }
    }
</script>