import { Car } from "./Car";
import { DealerLocation } from "./DealerLocation";

export class CarDealer {
    id!: number;
    name!: string;
    cars: Car[] = [];
    location!: DealerLocation;
}