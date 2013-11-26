function Unit(desc) {
    this.name = desc.name || "NA";
    this.mineral = desc.mineralCost || "NA";
    this.vespene = desc.gazCost || "NA";
    this.armySupply = desc.armySupply || "NA";
}

module.exports = Unit;