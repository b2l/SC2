function Unit(desc) {
    for (var prop in desc) {
        this[prop] = desc[prop];
    }
}

module.exports = Unit;