<template>
    <div>
        <navbar></navbar>
        <b-container fluid="lg" tag="main">
            <socket-status></socket-status>
            <router-view></router-view>
        </b-container>
    </div>
</template>

<script>
    import Navbar from './components/Navbar.vue'
    import SocketStatus from './components/SocketStatus.vue'

    export default {
        name: 'app',
        components: {
            Navbar,
            SocketStatus
        }
    };
</script>

<style lang="sass">
    @import 'styles/main'

    main
        margin-top: $navbar-total-height + .5rem
</style>