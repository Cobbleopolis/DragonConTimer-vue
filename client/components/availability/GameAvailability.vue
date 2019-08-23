<template>
    <div>
        <b-card-text>{{game.name}}</b-card-text>
        <b-card-text>{{$t('availability.games.total', {count: game.count})}}</b-card-text>
    </div>
</template>

<script>
    export default {
        name: 'GameAvailability',
        props: [ 'consoleId', 'game' ]
    }
</script>

<style scoped>

</style>