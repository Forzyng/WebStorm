class User {
    constructor(_name) {
        this.name = _name;
    }
}

var tom = new User("Том");
var header = this.document.getElementById("header");
header.innerHTML = "Привет " + tom.name;
