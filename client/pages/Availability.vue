<template>
    <div>
        <template v-for="console in consoles">
            <console-availability v-bind:console="console" v-bind:key="console.id"/>
        </template>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import ConsoleAvailability from '../components/availability/ConsoleAvailability'

    export default {
        name: 'availability',
        components: {ConsoleAvailability},
        computed: {
            ...mapState('consoles', ['consoles'])
        }
    }
</script>