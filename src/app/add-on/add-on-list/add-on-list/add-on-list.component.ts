import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddOnHttpService } from 'src/app/http-service/add-on-http.service';
import { AddOn } from 'src/app/model/AddOn';
import { AddOnEditorComponent } from '../../add-on-editor/add-on-editor/add-on-editor.component';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-add-on-list',
  templateUrl: './add-on-list.component.html',
  styleUrls: ['./add-on-list.component.css']
})
export class AddOnListComponent implements OnInit{
  @Input() addOns: AddOn[] = [];
  dataSource: MatTableDataSource<AddOn>;

  displayedColumns: string[] = ['name', 'description', 'price', 'actions'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private dialog: MatDialog,
    private readonly addOnHttpService: AddOnHttpService,
    ) {}

  ngOnInit(): void {
    this.getAddOns();
  }

  getAddOns() {
    this.addOnHttpService.getAllAddOns().subscribe({
      next: addOnsList => {
        this.addOns = addOnsList;
        this.setDataSource();
        console.log("Success");
      },
      error: () => console.log("Error")
    });
  }

  // Add methods for edit and remove functionalities
  onEditAddOn(addOn: AddOn): void {
    const dialogRef = this.dialog.open(AddOnEditorComponent, {
      width: '600px',
      data: { addOn }, // Pass the car object to the CarEditorComponent through data
    });

    dialogRef.afterClosed().subscribe((result: AddOn) => {
      // The result contains the edited car or undefined if the dialog was closed without saving
      if (result) {
        // Update the car data in the list or perform any other action with the edited car
        console.log('Edited AddOn:', result);
      }
    });
  }

  onCreateAddOn(): void {
    const dialogRef = this.dialog.open(AddOnEditorComponent, {
      width: '600px',
      data: { addOn: new AddOn() },
    });

    dialogRef.afterClosed().subscribe((result: AddOn) => {
      if (result) {
        this.addOns.push(result);
        this.setDataSource();
        console.log('Created addOn:', result);
      }
    });
  }

  onRemoveAddOn(addOn: AddOn): void {
    this.addOnHttpService.removeAddOn(addOn.id).subscribe({
      next: () => {
        console.log("Car removed")
        this.getAddOns();
      },
      error: () => console.log("Error")
    });
  }



  private setDataSource() {
    this.dataSource = new MatTableDataSource(this.addOns);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

}
