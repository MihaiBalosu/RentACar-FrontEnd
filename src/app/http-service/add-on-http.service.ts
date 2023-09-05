import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { AddOn } from '../model/AddOn';

@Injectable({
  providedIn: 'root'
})
export class AddOnHttpService {
    baseUrl = "http://localhost:8180/api"; 

    constructor(
        private httpClient: HttpClient) {
    }

    public getAllAddOns() {
        console.log(localStorage.getItem("jwtToken"))
        return this.httpClient.get<any>(this.baseUrl + "/add-on", {headers: this.getRequestHeader()})
    }

    public removeAddOn(id: number) {
        return this.httpClient
          .delete(`${this.baseUrl}/add-on/${id}`, {headers: this.getRequestHeader()});
    }

    public save(addOn: AddOn){
        return this.httpClient
          .post(this.baseUrl + "/add-on", addOn, {headers: this.getRequestHeader()});
    }

    private getRequestHeader(): HttpHeaders{
        return new HttpHeaders(
            {"Authorization": `Bearer ${<string>localStorage.getItem("jwtToken")}`}
          );  
    }
}