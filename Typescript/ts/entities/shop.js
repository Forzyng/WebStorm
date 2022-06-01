var Shop = /** @class */ (function () {
    function Shop(_name, _money, _isWorking) {
        this.name = _name;
        this.money = _money;
        this.isWorking = _isWorking;
    }
    return Shop;
}());

var shop= new Shop("First Shop", 123000, 2)



console.log(shop)