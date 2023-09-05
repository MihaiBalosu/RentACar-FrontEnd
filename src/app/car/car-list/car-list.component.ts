import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Car } from 'src/app/model/Car';
import { CarEditorComponent } from '../car-editor/car-editor.component';
import { getLocaleFirstDayOfWeek } from '@angular/common';
import { AuthenticationHttpService } from 'src/app/http-service/authentication-http.service';
import { CarHttpService } from 'src/app/http-service/car-http.service';
import { FuelTypeEnum } from 'src/app/model/FuelTypeEnum';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/model/User';
import { RoleEnum } from 'src/app/model/RoleEnum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css'],
})
export class CarListComponent implements OnInit{
  displayedColumns: string[] = ['name', 'photo', 'carDealer', 'fuelType', 'actions'];
  dataSource: MatTableDataSource<Car>; // Replace 'Car' with your actual data type

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Input("cars")
  cars: Car[] = [];

  @Input("startDate")
  startDate: Date;
  @Input("endDate")
  endDate: Date;

  constructor(private dialog: MatDialog,
    private readonly carHttpService: CarHttpService,
    private router: Router
    ) {}

  ngOnInit(): void {
    if(this.cars.length === 0 ){
      this.getCars();
    } else {
      this.setDataSource();
    }
  }

  getCars() {
    this.carHttpService.getAllCars().subscribe({
      next: carsList => {
        this.cars = carsList;
        this.setDataSource();
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
        this.setDataSource();
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

  onRentCar(car: Car): void {
    this.router.navigate(['/rental'], {
      queryParams: { car: JSON.stringify(car), 
        startDate: this.startDate?.toISOString(),
        endDate: this.endDate?.toISOString()
      }
    });
  }

  public isUserAdminOrDealer(): boolean{
    const currentUser : User = JSON.parse(localStorage.getItem('currentUser') || '{}')
    return RoleEnum.ADMIN === currentUser.role
       || RoleEnum.CAR_DEALER === currentUser.role;
  }

  private setDataSource() {
    this.dataSource = new MatTableDataSource(this.cars);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

}
