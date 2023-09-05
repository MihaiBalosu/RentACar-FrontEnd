import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CarHttpService } from 'src/app/http-service/car-http.service';
import { AvailableCarsDto } from 'src/app/model/AvailableCarsDto';
import { Car } from 'src/app/model/Car';
import { Review } from 'src/app/model/Review';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent {

  car: Car;
  dateRangeForm: FormGroup;
  showReviews: boolean;

  constructor(private route: ActivatedRoute, 
    private carHttpService: CarHttpService) { }

  ngOnInit() {

    this.dateRangeForm = new FormGroup({
      startDate: new FormControl(),
      endDate: new FormControl()
    });
    
    this.route.paramMap.subscribe(params => {
      const carIdString = params.get('id');
      if(carIdString){
        const carId = parseInt(carIdString);
        this.carHttpService.getCar(carId).subscribe({
          next: car => {
            this.car = car;
            console.log("Success");
          },
          error: () => console.log("Error")
        });
      }
    });
  }

  onCheckAvailability(car: Car){
    let carAvailabilityDto = new AvailableCarsDto(car.id, this.dateRangeForm.value.startDate, this.dateRangeForm.value.endDate)
    this.carHttpService.checkCarAvailability(carAvailabilityDto).subscribe({
      next: isCarAvailable => {
        if(isCarAvailable){
          console.log("yes");
        } else {
          console.log("no");
        }
      },
      error: () => console.log("Error")
    });
  }

  onReviewsRetrieved(reviews: Event){
    console.log(reviews)
    // this.car.reviews = reviews;
  }

  toggleReviewVisibility() {
    this.showReviews = !this.showReviews;
  }

}
