import buildinfo from '../buildinfo'

export default {
    en: {
        projectName: buildinfo.displayName,
        pageNames: {
            index: 'Main Page',
            availability: 'Availability'
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
                title: 'Status',
                default: "Available",
                checkedOut: "Checked Out",
                notAvailable: "Not Available"
            },
            availableConsoles: {
                text: "Available Consoles",
                formatted: "@:stations.availableConsoles.text: <span class=\"font-weight-bold\">{consoleOptions}</span>",
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
            },
            filters: {
                title: 'Filters',
                reset: 'Reset Filters',
                statusFilter: '@:stations.status.title',
                consoleFilter: '@:stations.availableConsoles.text'
            }
        },
        availability: {
            consoles: {
                available: 'Available: {count}/{total}',
                availableIn: 'Available in: {time}',
                needToBeKicked: 'Stations that need to be kicked: {stations}'
            },
            games: {
                availableIn: '@:availability.consoles.availableIn',
                needToBeKicked: '@:availability.consoles.needToBeKicked'
            }
        }
    }
}