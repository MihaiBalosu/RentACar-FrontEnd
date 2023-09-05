// rental.component.ts
import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AddOn } from '../model/AddOn';
import { Car } from '../model/Car';
import { ActivatedRoute } from '@angular/router';
import { AddOnHttpService } from '../http-service/add-on-http.service';
import { IgxPaginatorComponent } from 'igniteui-angular';
import { RentalDto } from '../model/RentalDto';
import { CarProtection } from '../model/CarProtection';
import { CarProtectionHttpService } from '../http-service/car-protection-http.service';
import { RentalHttpService } from '../http-service/rental-http.service';
import { DriverDto } from '../model/DriverDto';
import { MatDialog } from '@angular/material/dialog';
import { SuccessPopupComponent } from '../success-popup/success-popup.component';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {
  car: Car;
  startDate: Date;
  endDate: Date;

  addOns: AddOn[] = [];
  carProtections: CarProtection[] = [];
  rentGroup: FormGroup<any>;
  dateRangeForm: FormGroup<any>;
  customerForm: FormGroup<any>;

  rental: RentalDto = new RentalDto();

  public paginator!: IgxPaginatorComponent;
  public itemsPerPage = [3, 4, 5];

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute, 
    private addOnHttpService: AddOnHttpService,
    public cdr: ChangeDetectorRef,
    private carProtectionHttpService: CarProtectionHttpService,
    private rentalHttpService: RentalHttpService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.rentGroup = this.fb.group({
      customer: this.fb.group({
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
        dob: new FormControl('', Validators.required)
      }),
      dateRange: this.fb.group({
        startDate: new FormControl(),
        endDate: new FormControl()
      })
    });

    this.dateRangeForm = this.rentGroup.get('dateRange') as FormGroup;
    this.customerForm = this.rentGroup.get('customer') as FormGroup;

    this.route.queryParams.subscribe(params => {
      this.car = JSON.parse(params['car']);
      this.startDate = new Date(params['startDate']);
      this.endDate = new Date(params['endDate']);
    });

    this.rentGroup.get("dateRange")?.get("startDate")?.setValue(this.startDate);
    this.rentGroup.get("dateRange")?.get("endDate")?.setValue(this.endDate);

    this.addOnHttpService.getAllAddOns().subscribe({
      next: (addOns: AddOn[]) => {
        this.addOns = addOns;
        console.log("Success");
      },
      error: () => console.log("Error")
    });

    this.carProtectionHttpService.getAllCarProtections().subscribe({
      next: (carProtections: CarProtection[]) => {
        this.carProtections = carProtections;
      },
      error: () => console.log("Error")
    });
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
}

  calculateTotalPrice(): number {
    return 3;
  }

  rent(): void {
    let driver: DriverDto = new DriverDto();
    driver.brithDate = this.customerForm.value.dob;
    driver.email = this.customerForm.value.email;
    driver.firstname = this.customerForm.value.firstname;
    driver.lastname = this.customerForm.value.lastname;

    this.rental.car = this.car
    this.rental.driver = driver;
    this.rental.startDate = this.startDate;
    this.rental.endDate = this.endDate
    this.rentalHttpService.save(this.rental).subscribe({
      next: () => {
        this.customerForm.reset();
        this.dateRangeForm.reset();
        this.rentGroup.reset();
        this.openSuccessPopup()
        console.log("Success");
      },
      error: () => console.log("Error")
    });
  }

  public get addOnsData() {
    let addOns = this.addOns;
    addOns = this.paginator ?
    this.addOns.slice(this.paginator.page * this.paginator.perPage,
        ((this.paginator.page * this.paginator.perPage) + this.paginator.perPage)) : addOns;
    return addOns;
  }

  public get carProtectionsData() {
    let carProtections = this.carProtections;
    carProtections = this.paginator ?
    this.addOns.slice(this.paginator.page * this.paginator.perPage,
        ((this.paginator.page * this.paginator.perPage) + this.paginator.perPage)) : carProtections;
    return carProtections;
  }

  public addAddOn(addOn: AddOn){
    this.rental.addOns?.push(addOn);
  }

  public addCarProtection(carProtection: CarProtection){
    this.rental.carProtections?.push(carProtection);
  }

  private openSuccessPopup() {
    const dialogRef = this.dialog.open(SuccessPopupComponent, {
      width: '300px', // Adjust the width as needed
    });
  
    dialogRef.afterClosed().subscribe(() => {
      console.log('The success popup was closed.');
      // You can perform additional actions here if needed.
    });
  }
}
