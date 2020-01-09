<template>
    <b-navbar toggleable="lg" type="dark" variant="dark" fixed="top">
        <b-navbar-brand>{{ $t('projectName') }}</b-navbar-brand>
        <b-nav-toggle target="navCollapse"></b-nav-toggle>
        <b-collapse is-nav id="navCollapse">
            <b-navbar-nav>
                <b-nav-item v-for="link in $router.options.routes" v-bind:to="link.path" v-bind:key="link.name" exact>{{ $t('pageNames.' + link.name) }}</b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
    export default {
        name: 'navbar'
    }
</script>