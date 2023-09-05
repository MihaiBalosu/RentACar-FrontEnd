export class AvailableCarsDto {
    carId: Number | null;
    startDate: Date | null;
    endDate: Date | null;

    constructor(
        carId: Number | null,
        startDate: Date,
        endDate: Date){
            this.carId = carId;
            this.startDate = startDate;
            this.endDate = endDate;
    }
}