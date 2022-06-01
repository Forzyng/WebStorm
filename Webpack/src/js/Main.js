require('./DistanceFunctions')
import {sortByDistance} from "./DistanceFunctions";

console.log('first')

let stores = [
    {name: "Cool Store",     x: -71.0987, y: 82.7345},
    {name: "iNMarket",         x: -121.7654, y: 22.3656},
    {name: "Local Storage", x: -23.1234, y: 12.0812},
];


let here = {name: "You are here",  x: -71.1470, y: 42.3834};
let nearest = sortByDistance(here, stores)[0];
document.getElementById("nearest-store").innerHTML = nearest.name;