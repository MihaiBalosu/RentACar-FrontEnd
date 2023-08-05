import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { User } from '../model/User';
import { Car } from '../model/Car';

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
        console.log(localStorage.getItem("jwtToken"))
        return this.httpClient.get<any>(this.baseUrl + "/car", {headers: this.requestHeader})
    }

    public removeCar(id: number) {
        return this.httpClient
          .delete(`${this.baseUrl}/car/${id}`, {headers: this.requestHeader});
    }

    public save(car: Car){
        return this.httpClient
          .post(this.baseUrl + "/car", car, {headers: this.requestHeader});
    }
}
