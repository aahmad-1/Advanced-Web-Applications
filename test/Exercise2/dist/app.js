"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 1. TypeScript environment and usage
console.log("Hello World!");
const vehicle = {
    model: "Boring generic vehicle",
    color: "Red",
    year: 1993,
    power: 60
};
console.log(vehicle);
const Car = {
    model: "Ford focus",
    color: "Green",
    year: 2016,
    power: 150,
    bodyType: "Hatchback",
    wheelCount: 4
};
const Plane = {
    model: "Boeing 777",
    color: "White",
    year: 2020,
    power: 170000,
    wingspan: 65
};
const Boat = {
    model: "Bella",
    color: "Black",
    year: 2022,
    power: 100,
    draft: 0.42
};
console.log(Car);
console.log(Plane);
console.log(Boat);
// 4. Generic vehicle service
class VehicleService {
    items = [];
    add(item) {
        this.items.push(item);
    }
    list() {
        return this.items;
    }
}
const cars = new VehicleService();
const boats = new VehicleService();
cars.add(Car);
boats.add(Boat);
console.log(cars.list());
console.log(boats.list());
