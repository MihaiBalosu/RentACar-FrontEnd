import { Component, Input } from '@angular/core';
import { Review } from '../model/Review';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent {

  @Input('reviews') reviews: Review[] = [];

}
