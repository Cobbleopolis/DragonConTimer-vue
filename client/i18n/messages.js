import buildinfo from '../buildinfo'

export default {
    en: {
        projectName: buildinfo.displayName,
        pageNames: {
            index: 'Main Page',
            waitlist: 'Waitlist'
        },
        forms: {
            actions: {
                submit: "Submit",
                reset: "Reset",
                cancel: "Cancel"
            }
        },
        socket: {
            status: {
                label: 'Socket Status:',
                connected: 'Connected',
                disconnected: 'Disconnected'
            }
        },
        data: {
            invalidDuration: 'Invalid Duration'
        },
        stations: {
            actions: {
                title: 'Actions',
                setFields: 'Set Fields',
                checkOut: 'Check Out',
                checkIn: 'Check In/Return',
                toggleNotAvailable: 'Toggle @:stations.status.notAvailable',
                clearTime: 'Clear Time'
            },
            header: "{stationName} ({stationStatus})",
            status: {
                default: "Available",
                checkedOut: "Checked Out",
                notAvailable: "Not Available"
            },
            fields: {
                playerName: {
                    label: 'Name',
                    placeholder: 'Enter Player Name',
                    description: 'The name of the person playing.'
                },
                currentConsole: {
                    label: 'Console',
                    description: 'The console currently being played.'
                },
                currentGame: {
                    label: 'Game',
                    placeholder: 'Enter Game',
                    description: 'The game currently being played.'
                },
                timeSinceCheckout: {
                    label: 'Time Since Checkout',
                    placeholder: '1:00:00',
                    description: 'How long it has been since checkout.'
                },
                overrideCheckoutTimeEnable: {
                    label: "Override Checkout Time"
                },
                checkoutTime: {
                    label: "Checkout Time",
                    description: "The time that the station was checked out. This is is your local time."
                }
            },
            setFields: {
                title: 'Set Fields: {stationName}'
            }
        }
    }
}