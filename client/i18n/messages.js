import buildinfo from '../buildinfo'

export default {
    en: {
        projectName: buildinfo.displayName,
        pageNames: {
            index: 'Main Page',
            availability: 'Availability',
            config: 'Config'
        },
        forms: {
            actions: {
                submit: "Submit",
                reset: "Reset",
                cancel: "Cancel",
                delete: "Delete",
                save: "Save",
                add: "Add"
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
        consoles: {
            fields: {
                id: {
                    label: 'Id',
                    placeholder: 'console0',
                    description: 'The internal id of the console.'
                },
                name: {
                    label: 'Name',
                    placeholder: 'Console 0',
                    description: 'The name displayed in the dropdown menu.'
                },
                games: {
                    label: 'Games',
                    description: 'The list of games on this console.'
                },
                checkoutWarning: {
                    label: 'Checkout Warning',
                    placeholder: 'This console doesn\'t exist',
                    description: 'The warning displayed when checking out the console.'
                }
            }
        },
        games: {
            fields: {
                name: {
                    label: 'Name',
                    placeholder: 'Game',
                    description: 'The name of the game'
                },
                count: {
                    label: 'Count',
                    placeholder: '0',
                    description: 'How many copies of the game we have'
                }
            }
        },
        stations: {
            actions: {
                title: 'Actions',
                setFields: 'Set Fields',
                checkOut: 'Check Out',
                checkIn: 'Check In/Return',
                editNotes: 'Edit Notes',
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
                },
                notes: {
                    label: 'Notes',
                    displayLabel: '@:stations.fields.notes.label: {notes}',
                    placeholder: 'Write some notes',
                    description: 'Any needed notes about the station'
                }
            },
            setFields: {
                title: 'Set Fields: {stationName}'
            },
            editNotes: {
                title: 'Edit Notes: {stationName}'
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
        },
        config: {
            tabs: {
                consolesTab: 'Consoles',
                stationsTab: 'Stations'
            }
        }
    }
}