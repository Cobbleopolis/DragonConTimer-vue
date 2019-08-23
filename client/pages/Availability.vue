<template>
    <div>
        <code>{{JSON.stringify(consoles)}}</code>
        <template v-for="console in consoles">
            <console-availability v-bind:console="console"/>
        </template>
    </div>
</template>

<script>
    import {mapState, mapGetters} from 'vuex';
    import ConsoleAvailability from '../components/availability/ConsoleAvailability'

    export default {
        name: 'availability',
        components: {ConsoleAvailability},
        computed: {
            ...mapState('consoles', ['consoles'])
        }
    }
</script>