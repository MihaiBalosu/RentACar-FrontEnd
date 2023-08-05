import { Car } from "./Car";

export class CarDealer {
    id!: number;
    name!: string;
    cars: Car[] = [];
    location!: Location;
}