import { CarTypeEnum } from "./CarTypeEnum";
import { FuelTypeEnum } from "./FuelTypeEnum";
import { Review } from "./Review";

export class Car {
    id!: number;
    price!: Number;
    numberOfPassengers!: Number;
    numberOfBags!: Number;
    minimumAgeWithoutFee!: Number;
    name!: String;
    automaker!: String;
    photoPath!: String;
    automatic!: boolean;
    discountApplicable!: boolean;
    carDealer!: String;
    carType!: CarTypeEnum;
    fuelType!: FuelTypeEnum;
    reviews: Review[]
}