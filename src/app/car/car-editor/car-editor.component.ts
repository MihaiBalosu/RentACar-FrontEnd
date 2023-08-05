import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CarDealerHttpService } from 'src/app/http-service/car-dealer-http.service';
import { CarHttpService } from 'src/app/http-service/car-http.service';
import { BaseOption } from 'src/app/model/BaseOption';
import { Car } from 'src/app/model/Car';
import { CarTypeEnum } from 'src/app/model/CarTypeEnum';
import { FuelTypeEnum } from 'src/app/model/FuelTypeEnum';

@Component({
  selector: 'app-car-editor',
  templateUrl: './car-editor.component.html',
  styleUrls: ['./car-editor.component.css'],
})
export class CarEditorComponent {
  @Input() car: Car = new Car();
  @Output() saveCar = new EventEmitter<Car>();

  carTypesBaseOptions = this.toBaseList(CarTypeEnum)
  fuelTypesBaseOptions = this.toBaseList(FuelTypeEnum)
  carDealersNames: String[] = [];

  carForm: FormGroup;
  selectedPhoto: File | null = null;
  photoPreviewUrl: String = "";
  
  constructor(private formBuilder: FormBuilder,
    private readonly carHttpService: CarHttpService,
    private readonly carDealerHttpService: CarDealerHttpService,
    public dialogRef: MatDialogRef<CarEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    this.carForm = this.formBuilder.group({
      name: [null, Validators.required],
      price: [0, Validators.required],
      numberOfPassengers: [5, Validators.required],
      numberOfBags: [2, Validators.required],
      minimumAgeWithoutFee: [23, Validators.required],
      automaker: [null, Validators.required],
      photoPath: [null],
      automatic: [false],
      discountApplicable: [false],
      carDealer: [null, Validators.required],
      carType: [CarTypeEnum.SEDAN, Validators.required], // Set default enum value
      fuelType: [FuelTypeEnum.GASOLINE, Validators.required], // Set default enum value
    });
  }

  ngOnInit(): void {
    if(this.data.car.name){
      this.loadCar(this.data.car);
    } else{
      this.carDealerHttpService.getCarDealersNames().subscribe({
        next: carDealersNames => {
          this.carDealersNames = carDealersNames;
          console.log("Success");
        },
        error: () => console.log("Error")
      });
    }    
  }

  loadCar(car: Car): void {
    this.carForm.controls['name'].setValue(car.name);
    this.carForm.controls['automaker'].setValue(car.automaker);
    this.carForm.controls['price'].setValue(car.price);
    this.carForm.controls['numberOfPassengers'].setValue(car.numberOfPassengers);
    this.carForm.controls['numberOfBags'].setValue(car.numberOfBags);
    this.carForm.controls['minimumAgeWithoutFee'].setValue(car.minimumAgeWithoutFee);
    this.photoPreviewUrl = car.photoPath;
    this.carForm.controls['automatic'].setValue(car.automatic);
    this.carForm.controls['carDealer'].setValue(car.carDealer);
    this.carForm.controls['carType'].setValue(car.carType);
    this.carForm.controls['fuelType'].setValue(car.fuelType);
    this.carForm.controls['discountApplicable'].setValue(car.discountApplicable);
    }

  onSaveCar(): void {
    console.log("save")
    if (this.carForm.valid) {
      this.car.name = this.carForm.controls['name'].value;
      this.car.automaker = this.carForm.controls['automaker'].value;
      this.car.price = this.carForm.controls['price'].value;
      this.car.numberOfPassengers = this.carForm.controls['numberOfPassengers'].value;
      this.car.numberOfBags = this.carForm.controls['numberOfBags'].value;
      this.car.minimumAgeWithoutFee = this.carForm.controls['minimumAgeWithoutFee'].value;
      this.car.photoPath = this.photoPreviewUrl as string;
      this.car.automatic = this.carForm.controls['automatic'].value;
      this.car.carDealer = this.carForm.controls['carDealer'].value;
      this.car.carType = this.carForm.controls['carType'].value;
      this.car.fuelType = this.carForm.controls['fuelType'].value;


      console.log(this.car)
      console.log("save call")
      this.carHttpService.save(this.car).subscribe({
        next: car => {
          this.dialogRef.close(car);
          console.log("Success");
        },
        error: () => console.log("Error")
      });
    }
  }
  onPhotoSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedPhoto = inputElement.files[0];

      // Read the selected file and display the preview
      const reader = new FileReader();
      reader.onload = () => {
        this.photoPreviewUrl = reader.result as String;
      };
      reader.readAsDataURL(this.selectedPhoto);
    }
  }

  toBaseList(enumeration: any) {
    let baseOptions: BaseOption[] = [];

    Object.keys(enumeration)
      .filter((key) => !Number(key) && key !== "0")
      .forEach(async (key) => {
        let translatedValue = enumeration[key];

        baseOptions.push(new BaseOption(key, translatedValue));
      });
    return baseOptions;
  }
}
