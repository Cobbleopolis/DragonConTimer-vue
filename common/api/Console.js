export default class Console {
    constructor(id, name, games) {
        if (typeof(id) ==="string" && Array.isArray(name) && games === undefined) {
            this.id = id.toLowerCase().replace(/\s+/, "")
            this.name = id;
            this.games = name;
        } else {
            this.id = id;
            this.name = name;
            this.games = games;
        }

    }
}