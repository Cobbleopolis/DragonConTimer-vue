import StationStatus from '../../common/api/StationStatus'

export default {
    beforeCreate() {
        this.StationStatus = StationStatus
    },
    methods: {
        getLocalizedStationStatus(status) {
            switch (status) {
                case this.StationStatus.DEFAULT:
                    return this.$t('stations.fields.status.values.default')
                case this.StationStatus.CHECKED_OUT:
                    return this.$t('stations.fields.status.values.checkedOut')
                case this.StationStatus.NOT_AVAILABLE:
                    return this.$t('stations.fields.status.values.notAvailable')
                default:
                    return this.$t('stations.fields.status.values.default')
            }
        }
    }
}