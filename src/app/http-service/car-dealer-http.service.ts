import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { CarDealer } from '../model/CarDealer';

@Injectable({
  providedIn: 'root'
})
export class CarDealerHttpService {
    baseUrl = "http://localhost:8180/api";

    requestHeader = new HttpHeaders(
        {"Authorization": `Bearer ${<string>localStorage.getItem("jwtToken")}`}
      );  

    constructor(
        private httpClient: HttpClient) {
    }

    public getCarDealersNames() {
        console.log(localStorage.getItem("jwtToken"))
        return this.httpClient.get<String[]>(this.baseUrl + "/car-dealer/name")
    }

    public getAllCarDealer() {
        console.log(localStorage.getItem("jwtToken"))
        return this.httpClient.get<any>(this.baseUrl + "/car-dealer", {headers: this.requestHeader})
    }

    public removeCarDealer(id: number) {
        return this.httpClient
          .delete(`${this.baseUrl}/car-dealer/${id}`, {headers: this.requestHeader});
    }

    public save(car: CarDealer){
        return this.httpClient
          .post(this.baseUrl + "/car-dealer", car, {headers: this.requestHeader});
    }
}
