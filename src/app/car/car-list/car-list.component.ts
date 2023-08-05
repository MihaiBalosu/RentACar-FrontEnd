import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Car } from 'src/app/model/Car';
import { CarEditorComponent } from '../car-editor/car-editor.component';
import { getLocaleFirstDayOfWeek } from '@angular/common';
import { AuthenticationHttpService } from 'src/app/http-service/authentication-http.service';
import { CarHttpService } from 'src/app/http-service/car-http.service';
import { FuelTypeEnum } from 'src/app/model/FuelTypeEnum';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css'],
})
export class CarListComponent implements OnInit{
  @Input() cars: Car[] = [];

  constructor(private dialog: MatDialog,
    private readonly carHttpService: CarHttpService,
    ) {}

  ngOnInit(): void {
    this.getCars();
  }

  getCars() {
    this.carHttpService.getAllCars().subscribe({
      next: carsList => {
        this.cars = carsList;
        console.log("Success");
      },
      error: () => console.log("Error")
    });
  }

  // Add methods for edit and remove functionalities
  onEditCar(car: Car): void {
    const dialogRef = this.dialog.open(CarEditorComponent, {
      width: '600px',
      data: { car }, // Pass the car object to the CarEditorComponent through data
    });

    dialogRef.afterClosed().subscribe((result: Car) => {
      // The result contains the edited car or undefined if the dialog was closed without saving
      if (result) {
        // Update the car data in the list or perform any other action with the edited car
        console.log('Edited Car:', result);
      }
    });
  }

  onCreateCar(): void {
    const dialogRef = this.dialog.open(CarEditorComponent, {
      width: '600px',
      data: { car: new Car() },
    });

    dialogRef.afterClosed().subscribe((result: Car) => {
      if (result) {
        this.cars.push(result);
        console.log('Created Car:', result);
      }
    });
  }

  onRemoveCar(car: Car): void {
    this.carHttpService.removeCar(car.id).subscribe({
      next: () => {
        console.log("Car removed")
        this.getCars();
      },
      error: () => console.log("Error")
    });
  }
}
