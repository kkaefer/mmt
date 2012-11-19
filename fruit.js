function Fruit(weight) {
    this.weight = weight;
}

Fruit.prototype.calories = 30;

Fruit.prototype.nutritionalInfo = function() {
    return this.calories * this.weight;
};

module.exports = Fruit;