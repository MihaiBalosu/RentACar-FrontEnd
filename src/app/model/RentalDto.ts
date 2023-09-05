import { AddOn } from "./AddOn";
import { Car } from "./Car";
import { CarProtection } from "./CarProtection";
import { DriverDto } from "./DriverDto";

export class RentalDto {   
    startDate: Date | null;
    endDate: Date | null;
    car: Car | null;
    addOns: AddOn[] | null;
    carProtections: CarProtection[] | null;
    driver: DriverDto | null;

    constructor(){
        this.carProtections = [];
        this.addOns = [];
    } 
}