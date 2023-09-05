import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DealerLocation } from 'src/app/model/DealerLocation';
import { CarDealer } from 'src/app/model/CarDealer';
import { CarDealerHttpService } from 'src/app/http-service/car-dealer-http.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dealer-editor',
  templateUrl: './dealer-editor.component.html',
  styleUrls: ['./dealer-editor.component.css'],
})
export class DealerEditorComponent implements OnInit {
  dealerForm!: FormGroup;
  selectedLocation: DealerLocation = new DealerLocation();

  constructor(private formBuilder: FormBuilder,     
    private readonly carDealerHttpService: CarDealerHttpService,
    public dialogRef: MatDialogRef<DealerEditorComponent>,
    ) {}

  ngOnInit() {
    this.dealerForm = this.formBuilder.group({
      name: ['', Validators.required],
      // Add other dealer form fields here
    });
  }

  display: any;
    center: google.maps.LatLngLiteral = {
        lat: 22.2736308,
        lng: 70.7512555
    };
    zoom = 4;

    move(event: google.maps.MapMouseEvent) {
        if (event.latLng != null) this.display = event.latLng.toJSON();
    }

  onMapClick(event: any) {
    this.selectedLocation.latitude = event.latLng.lat();
    this.selectedLocation.longitude = event.latLng.lng()
    this.reverseGeocode(this.selectedLocation.latitude, this.selectedLocation.longitude);
  }

  reverseGeocode(latitude: number, longitude: number) {
    // const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBS8Bs3AfaWCFUyOL4K6yJLdBzjnZZLnfI`;
    
    // this.http.get<any>(apiUrl).subscribe((response) => {
    //   if (response.results.length > 0) {
    //     const addressComponents = response.results[0].address_components;
    //     const city = this.extractAddressComponent(addressComponents, 'locality');
    //     const country = this.extractAddressComponent(addressComponents, 'country');

    //   }
    // });

    this.selectedLocation.city = "Craiova";
    this.selectedLocation.country = "Romania";
  }

  extractAddressComponent(components: any[], type: string): string {
    for (const component of components) {
      if (component.types.includes(type)) {
        return component.long_name;
      }
    }
    return '';
  }

  saveDealer() {
    if (this.dealerForm.valid) {
      const dealerData: CarDealer = {
        ...this.dealerForm.value,
        location: this.selectedLocation,
      };

      this.carDealerHttpService.save(dealerData).subscribe({
        next: carDealer => {
          this.dialogRef.close(carDealer);
          console.log("Success");
        },
        error: () => console.log("Error")
      });
    }
  }
}
