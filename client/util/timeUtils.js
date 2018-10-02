import moment from 'moment'

export default {
    formatDurationFormat(momentObj) {
        if (moment.isDuration(momentObj))
            return (momentObj.asHours() | 0) + ":" + moment.utc(momentObj.asMilliseconds()).format('mm:ss');
        else
            return null;
    }
}