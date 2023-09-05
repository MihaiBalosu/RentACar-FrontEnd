import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { User } from '../model/User';
import { Car } from '../model/Car';
import { AvailableCarsDto } from '../model/AvailableCarsDto';
import { Review } from '../model/Review';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarHttpService {
    baseUrl = "http://localhost:8180/api";

    requestHeader = new HttpHeaders(
        {"Authorization": `Bearer ${<string>localStorage.getItem("jwtToken")}`}
      );  

    constructor(
        private httpClient: HttpClient) {
    }

    public getAllCars() {
        return this.httpClient.get<any>(this.baseUrl + "/car", {headers: this.requestHeader})
    }

    public removeCar(id: number) {
        return this.httpClient
          .delete(`${this.baseUrl}/car/${id}`, {headers: this.requestHeader});
    }

    getCar(id: number) {
      return this.httpClient
        .get<Car>(`${this.baseUrl}/car/${id}`);
    }

    public save(car: Car) {
        return this.httpClient
          .post(this.baseUrl + "/car", car, {headers: this.requestHeader});
    }


    addReview(review: Review): Observable<any> {
      return this.httpClient
        .post(this.baseUrl + "/car/car-review", review, {headers: this.requestHeader});
    }

    public getBestRatedCars() {
      return this.httpClient.get<any>(this.baseUrl + "/car/best-rated-cars")
    }

    public getUnavailableDates(id: number) {
      return this.httpClient.get<Date[]>(`${this.baseUrl}/car/unavailable-dates/${id}`)
    }

    public getAvailableCarForPeriod(availableCarsDto: AvailableCarsDto) {
      return this.httpClient.post<Car[]>(this.baseUrl + "/car/available-cars-for-dates", availableCarsDto)
    }

    public checkCarAvailability(availableCarsDto: AvailableCarsDto) {
      return this.httpClient.post<Boolean>(this.baseUrl + "/car/is-car-available", availableCarsDto)
    }
}
