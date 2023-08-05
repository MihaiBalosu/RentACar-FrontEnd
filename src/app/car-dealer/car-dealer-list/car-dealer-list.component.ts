import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CarDealer } from 'src/app/model/CarDealer';
import { DealerEditorComponent } from '../dealer-editor/dealer-editor.component';
import { CarDealerHttpService } from 'src/app/http-service/car-dealer-http.service';

@Component({
  selector: 'app-car-dealer-list',
  templateUrl: './car-dealer-list.component.html',
  styleUrls: ['./car-dealer-list.component.css']
})
export class CarDealerListComponent {

  dealersList: CarDealer[] = []; // Populate this array with the list of car dealers

  constructor(private dialog: MatDialog,
    private readonly carHttpService: CarDealerHttpService,
    ) {}

  ngOnInit(): void {
    this.getCars();
  }

  getCars() {
    this.carHttpService.getAllCarDealer().subscribe({
      next: dealersList => {
        this.dealersList = dealersList;
        console.log("Success");
      },
      error: () => console.log("Error")
    });
  }

  // Add methods for edit and remove functionalities
  onEditCarDealer(car: CarDealer): void {
    const dialogRef = this.dialog.open(DealerEditorComponent, {
      width: '600px',
      data: { car }, // Pass the car object to the CarEditorComponent through data
    });

    dialogRef.afterClosed().subscribe((result: CarDealer) => {
      // The result contains the edited car or undefined if the dialog was closed without saving
      if (result) {
        // Update the car data in the list or perform any other action with the edited car
        console.log('Edited Car:', result);
      }
    });
  }

  onCreateCarDealer(): void {
    const dialogRef = this.dialog.open(DealerEditorComponent, {
      width: '600px',
      data: { car: new CarDealer() },
    });

    dialogRef.afterClosed().subscribe((result: CarDealer) => {
      if (result) {
        this.dealersList.push(result);
        console.log('Created Car:', result);
      }
    });
  }

  onRemoveCarDealer(car: CarDealer): void {
    this.carHttpService.removeCarDealer(car.id).subscribe({
      next: () => {
        console.log("Car removed")
        this.getCars();
      },
      error: () => console.log("Error")
    });
  }
}
