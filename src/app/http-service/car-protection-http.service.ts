import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { CarProtection } from '../model/CarProtection';

@Injectable({
  providedIn: 'root'
})
export class CarProtectionHttpService {
    baseUrl = "http://localhost:8180/api";

    constructor(
        private httpClient: HttpClient) {
    }

    public getAllCarProtections() {
        console.log(localStorage.getItem("jwtToken"))
        return this.httpClient.get<any>(this.baseUrl + "/car-protection", {headers: this.getRequestHeader()})
    }

    public removeCarProtection(id: number) {
        return this.httpClient
          .delete(`${this.baseUrl}/car-protection/${id}`, {headers: this.getRequestHeader()});
    }

    public save(carProtection: CarProtection){
        return this.httpClient
          .post(this.baseUrl + "/car-protection", carProtection, {headers: this.getRequestHeader()});
    }

    private getRequestHeader(): HttpHeaders{
        return new HttpHeaders(
            {"Authorization": `Bearer ${<string>localStorage.getItem("jwtToken")}`}
          );  
    }
}