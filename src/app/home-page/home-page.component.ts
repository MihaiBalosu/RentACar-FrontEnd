import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CarHttpService } from '../http-service/car-http.service';
import { AvailableCarsDto } from '../model/AvailableCarsDto';
import { Car } from '../model/Car';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{
  dateRangeForm: FormGroup;
  availableCars: Car[] = [];
  searchButtonClicked: boolean = false;

  constructor(private readonly carHttpService: CarHttpService) { 
  }

  ngOnInit(): void {
    this.dateRangeForm = new FormGroup({
      startDate: new FormControl(),
      endDate: new FormControl()
    });
  }

  public searchAvailableCars(){
    let availableCarsDto: AvailableCarsDto = new AvailableCarsDto(null, 
      this.dateRangeForm.get("startDate")?.value, this.dateRangeForm.get("endDate")?.value)

      this.carHttpService.getAvailableCarForPeriod(availableCarsDto).subscribe({
        next: availableCars => {
          this.availableCars = availableCars;
          this.searchButtonClicked = true;
        },
        error: (error) => console.log(error)
      });

  }



}
