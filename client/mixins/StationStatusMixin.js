import StationStatus from '../../common/api/StationStatus'

export default {
    beforeCreate() {
        this.StationStatus = StationStatus
    }
}