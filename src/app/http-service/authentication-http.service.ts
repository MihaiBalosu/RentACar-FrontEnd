import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormGroup} from "@angular/forms";
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationHttpService {

  baseUrl = "http://localhost:8180/api";

  requestHeader = new HttpHeaders(
    {"No-Auth": "True"}
  );

  constructor(
    private httpClient: HttpClient) {
  }

  public login(username: string, password: string) {
    return this.httpClient.post<any>(this.baseUrl + "/login", { username, password })
}

  public register(user: User) {
    return this.httpClient
      .post<User>(this.baseUrl + "/register", user);
  }
}
