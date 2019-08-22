import StationStatus from '../../common/api/StationStatus'

export default {
    beforeCreate() {
        this.StationStatus = StationStatus
    },
    methods: {
        getLoaclizedStationStatus(status) {
            switch (status) {
                case this.StationStatus.DEFAULT:
                    return this.$t('stations.status.default')
                case this.StationStatus.CHECKED_OUT:
                    return this.$t('stations.status.checkedOut')
                case this.StationStatus.NOT_AVAILABLE:
                    return this.$t('stations.status.notAvailable')
                default:
                    return this.$t('stations.status.default')
            }
        }
    }
}