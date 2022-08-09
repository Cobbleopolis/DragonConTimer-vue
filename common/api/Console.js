import Game from './Game'

export default class Console {
    constructor(id, name, games, checkoutWarning) {
        if (typeof(id) === "string" && Array.isArray(name) && games === undefined) {
            this.id = id.toLowerCase().replace(/\s+/, "")
            this.name = id;
            if (name) {
                this.games = name.map(obj => new Game(obj.name, obj.count))
                    .sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1);
            } else {
                this.games = []
            }
        } else {
            this.id = id;
            this.name = name;
            if (games) {
                this.games = games.map(obj => new Game(obj.name, obj.count))
                    .sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1);
            } else {
                this.games = []
            }
        }
        this.checkoutWarning = checkoutWarning;

    }
}