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
        computed: {
            ...mapState(['socketConnected'])
        }
    }
</script>