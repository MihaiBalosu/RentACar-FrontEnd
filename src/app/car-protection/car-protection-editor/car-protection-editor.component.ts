import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CarProtectionHttpService } from 'src/app/http-service/car-protection-http.service';
import { CarProtection } from 'src/app/model/CarProtection';

@Component({
  selector: 'app-car-protection-editor',
  templateUrl: './car-protection-editor.component.html',
  styleUrls: ['./car-protection-editor.component.css']
})
export class CarProtectionEditorComponent implements OnInit{

  @Input() carProtection: CarProtection = new CarProtection();
  @Output() saveAddOn = new EventEmitter<CarProtection>();

  carProtectionForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private readonly carProtectionHttpService: CarProtectionHttpService,
    public dialogRef: MatDialogRef<CarProtectionEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    this.carProtectionForm = this.formBuilder.group({
      name: [null, Validators.required],
      price: [0, Validators.required],
      description: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    if(this.data.carProtection){
      this.loadCarProtection(this.data.carProtection);
    }
  }

  loadCarProtection(carProtection: CarProtection): void {
    this.carProtectionForm.controls['name'].setValue(carProtection.name);
    this.carProtectionForm.controls['description'].setValue(carProtection.description);
    this.carProtectionForm.controls['price'].setValue(carProtection.price);
    this.carProtection.id = carProtection.id;
    }

  onSaveCarProtection(): void {
    console.log("save")
    if (this.carProtectionForm.valid) {
      this.carProtection.name = this.carProtectionForm.controls['name'].value;
      this.carProtection.description = this.carProtectionForm.controls['description'].value;
      this.carProtection.price = this.carProtectionForm.controls['price'].value;

      console.log(this.carProtection)
      console.log("save carProtection")
      this.carProtectionHttpService.save(this.carProtection).subscribe({
        next: carProtection => {
          this.dialogRef.close(carProtection);
          console.log("Success");
        },
        error: () => console.log("Error")
      });
    }
  }

}
