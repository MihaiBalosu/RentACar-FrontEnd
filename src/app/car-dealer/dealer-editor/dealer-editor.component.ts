import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DealerLocation } from 'src/app/model/DealerLocation';
import { CarDealer } from 'src/app/model/CarDealer';

@Component({
  selector: 'app-dealer-editor',
  templateUrl: './dealer-editor.component.html',
  styleUrls: ['./dealer-editor.component.css'],
})
export class DealerEditorComponent implements OnInit {
  dealerForm!: FormGroup;
  selectedLocation: DealerLocation = new DealerLocation();

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.dealerForm = this.formBuilder.group({
      name: ['', Validators.required],
      // Add other dealer form fields here
    });
  }

  onMapClick(event: any) {
    this.selectedLocation.latitude = event.coords.lat;
    this.selectedLocation.longitude = event.coords.lng;
    this.reverseGeocode(event.coords.lat, event.coords.lng);
  }

  reverseGeocode(latitude: number, longitude: number) {
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCn3dK4iamN8xCBVJzVIvMwEbyRUdylRA4`;
    
    this.http.get<any>(apiUrl).subscribe((response) => {
      if (response.results.length > 0) {
        const addressComponents = response.results[0].address_components;
        const city = this.extractAddressComponent(addressComponents, 'locality');
        const country = this.extractAddressComponent(addressComponents, 'country');

        this.selectedLocation.city = city;
        this.selectedLocation.country = country;
      }
    });
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
      // Perform API call or any other saving logic with dealerData
    }
  }
}
