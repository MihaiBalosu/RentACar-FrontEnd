import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StarRatingColor } from '../star-rating/star-rating.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CarHttpService } from '../http-service/car-http.service';
import { Review } from '../model/Review';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit{

  @Output() reviewsRetrieved = new EventEmitter();

  @Input("carId")
  carId: Number;

  opinion: string = '';

  rating:number = 0;
  // starColor:StarRatingColor = StarRatingColor.accent;
  // starColorP:StarRatingColor = StarRatingColor.primary;
  // starColorW:StarRatingColor = StarRatingColor.warn;

  constructor(
    private carHttpService: CarHttpService) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
   
  } 

  onRatingChanged(rating: number){
    this.rating = rating
    console.log(this.rating)

  }

  submitReview(){
    let review: Review = new Review();
    review.rating = this.rating;
    review.review = this.opinion;
    review.carId = this.carId;

    this.carHttpService.addReview(review).subscribe({
      next: (result: Review[]) => {
        this.rating = 0;
        this.opinion = "";
        this.reviewsRetrieved.emit(result);
        console.log("Success");
      },
      error: () => console.log("Error")
    });
  }

}
