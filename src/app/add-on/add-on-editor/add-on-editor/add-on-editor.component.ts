import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddOnHttpService } from 'src/app/http-service/add-on-http.service';
import { AddOn } from 'src/app/model/AddOn';

@Component({
  selector: 'app-add-on-editor',
  templateUrl: './add-on-editor.component.html',
  styleUrls: ['./add-on-editor.component.css']
})
export class AddOnEditorComponent implements OnInit{

  @Input() addOn: AddOn = new AddOn();
  @Output() saveAddOn = new EventEmitter<AddOn>();

  addOnForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private readonly addOnHttpService: AddOnHttpService,
    public dialogRef: MatDialogRef<AddOnEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    this.addOnForm = this.formBuilder.group({
      name: [null, Validators.required],
      price: [0, Validators.required],
      description: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    if(this.data.addOn){
      this.loadAddOn(this.data.addOn);
    }
  }

  loadAddOn(addOn: AddOn): void {
    this.addOnForm.controls['name'].setValue(addOn.name);
    this.addOnForm.controls['description'].setValue(addOn.description);
    this.addOnForm.controls['price'].setValue(addOn.price);
    this.addOn.id = addOn.id;
    }

  onSaveAddOn(): void {
    console.log("save")
    if (this.addOnForm.valid) {
      this.addOn.name = this.addOnForm.controls['name'].value;
      this.addOn.description = this.addOnForm.controls['description'].value;
      this.addOn.price = this.addOnForm.controls['price'].value;

      console.log(this.addOn)
      console.log("save call")
      this.addOnHttpService.save(this.addOn).subscribe({
        next: addOn => {
          this.dialogRef.close(addOn);
          console.log("Success");
        },
        error: () => console.log("Error")
      });
    }
  }

}
