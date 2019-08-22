import SocketEvents from '../../common/ref/SocketEvents'

let StoreConstants = {
    Stations: {},
    Consoles: {},
    CoreInfo: {}
}

for (let i in SocketEvents) {
    if (!StoreConstants[i])
        StoreConstants[i] = {};
    for (let [k, v] of Object.entries(SocketEvents[i]))
        StoreConstants[i][k] = 'SOCKET_' + v;
}

export default StoreConstants;