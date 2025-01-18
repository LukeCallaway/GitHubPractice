class Vehicle {
    constructor(make, model, year) {
        this.make = make;
        this.model = model;
        this.year = year;
    }
    honk() {
        return "Beep"
    }
    toString() {
        return `The vehicle ${this.make} ${this.model} from ${this.year}.`
    }
}

//let newVehicle = new Vehicle("Dodge", "Dart", 2014);

class Car extends Vehicle {
    constructor(make, model, year) {
        super(make, model, year);
        this.numWheels = 4;
    }
}

//let newCar = new Car("Dodge", "Dart", 2014);

class Motorcycle extends Vehicle {
    constructor(make, model, year) {
        super(make, model, year);
        this.numWheels = 2;
    }
    revEngine(){
        return "VROOM!!!";
    }
}

//let newMotorcycle = new Motorcycle("Ninja", "H2", "2018");

class Garage{
    constructor(capacity){
        this.capacity = capacity;
        this.vehicles = [];
    }
    add(newVehicle) {
        if (! (newVehicle instanceof Vehicle)) {
            return "We only allow vehicles here."
        }
        if(this.vehicles.length < this.capacity){
           this.vehicles.push(newVehicle);
           return "We have added your vehicle!"
        } else{
            return "At maximum capacity";
        }
    }
}

//let newGarage = new Garage(2);