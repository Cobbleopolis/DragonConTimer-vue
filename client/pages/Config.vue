<template>
    <div>
        <b-card no-body>
            <b-tabs card>
                <b-tab :title="$t('config.tabs.consolesTab')" lazy>
                    <console-config-tab/>
                </b-tab>
                <b-tab :title="$t('config.tabs.stationsTab')" lazy>
                    <station-config-tab/>
                </b-tab>
            </b-tabs>
        </b-card>
    </div>
</template>

<script>
import ConsoleConfigTab from '../components/config/ConsoleConfigTab.vue'
import StationConfigTab from '../components/config/StationConfigTab.vue'

export default {
    components: { ConsoleConfigTab, StationConfigTab },
    name: 'config-page',
}
</script>
