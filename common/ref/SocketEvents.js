const SocketEvents = {
    CoreInfo: {
        SEND_CORE_INFO: 'SEND_CORE_INFO'
    },
    Stations: {
        ADD_STATION: 'ADD_STATION',
        DELETE_STATION: 'DELETE_STATION',
        UPDATE_STATION_FIELDS: 'UPDATE_STATION_FIELDS',
        UPDATE_STATION_STATUS: 'UPDATE_STATION_STATUS',
        CLEAR_TIME: 'CLEAR_TIME',
        EDIT_NOTES: 'EDIT_NOTES'
    },
    Consoles: {
        ADD_CONSOLE: 'ADD_CONSOLE',
        UPDATE_CONSOLE_FIELDS: 'UPDATE_CONSOLE_FIELDS',
        DELETE_CONSOLE: 'DELETE_CONSOLE',
    }
};

export default SocketEvents;