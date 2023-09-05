import { Component, Input, OnInit } from '@angular/core';
import { CarProtection } from 'src/app/model/CarProtection';
import { CarProtectionEditorComponent } from '../car-protection-editor/car-protection-editor.component';
import { CarProtectionHttpService } from 'src/app/http-service/car-protection-http.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-car-protection-list',
  templateUrl: './car-protection-list.component.html',
  styleUrls: ['./car-protection-list.component.css']
})
export class CarProtectionListComponent implements OnInit{
  @Input() carProtections: CarProtection[] = [];

  constructor(private dialog: MatDialog,
    private readonly carProtectionHttpService: CarProtectionHttpService,
    ) {}

  ngOnInit(): void {
    this.getCarProtections();
  }

  getCarProtections() {
    this.carProtectionHttpService.getAllCarProtections().subscribe({
      next: carProtectionsList => {
        this.carProtections = carProtectionsList;
        console.log("Success");
      },
      error: () => console.log("Error")
    });
  }

  // Add methods for edit and remove functionalities
  onEditCarProtection(carProtection: CarProtection): void {
    const dialogRef = this.dialog.open(CarProtectionEditorComponent, {
      width: '600px',
      data: { carProtection }, // Pass the car object to the CarEditorComponent through data
    });

    dialogRef.afterClosed().subscribe((result: CarProtection) => {
      // The result contains the edited car or undefined if the dialog was closed without saving
      if (result) {
        // Update the car data in the list or perform any other action with the edited car
        console.log('Edited CarProtection:', result);
      }
    });
  }

  onCreateCarProtection(): void {
    const dialogRef = this.dialog.open(CarProtectionEditorComponent, {
      width: '600px',
      data: { carProtection: new CarProtection() },
    });

    dialogRef.afterClosed().subscribe((result: CarProtection) => {
      if (result) {
        this.carProtections.push(result);
        console.log('Created carProtection:', result);
      }
    });
  }

  onRemoveCarProtection(carProtection: CarProtection): void {
    this.carProtectionHttpService.removeCarProtection(carProtection.id).subscribe({
      next: () => {
        console.log("Car removed")
        this.getCarProtections();
      },
      error: () => console.log("Error")
    });
  }


}
