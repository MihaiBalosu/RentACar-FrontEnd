import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { AddOn } from '../model/AddOn';
import { RentalDto } from '../model/RentalDto';

@Injectable({
  providedIn: 'root'
})
export class RentalHttpService {
    baseUrl = "http://localhost:8180/api"; 

    constructor(
        private httpClient: HttpClient) {
    }

    public save(rental: RentalDto){
        return this.httpClient
          .post(this.baseUrl + "/booking", rental);
    }
}