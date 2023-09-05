import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormGroup} from "@angular/forms";
import { User } from '../model/User';
import { LoginResponse } from '../model/LoginResponse';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationHttpService {

  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();


  private currentTokenSubject: BehaviorSubject<String | null> = new BehaviorSubject<String | null>(localStorage.getItem('jwtToken') || null);
  public currentToken$: Observable<String | null> = this.currentTokenSubject.asObservable();


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

  public logout(){
    return this.httpClient.post<any>(this.baseUrl + "/logout", null)
  }

  public register(user: User) {
    return this.httpClient
      .post<LoginResponse>(this.baseUrl + "/register", user);
  }

  public setCurrentUser(user: User): void {
    this.currentUserSubject.next(user);
  }

  public clearCurrentUser(): void {
    this.currentUserSubject.next(null);
  }

  public setCurrentToken(token: String): void {
    this.currentTokenSubject.next(token);
  }

  public clearCurrentToken(): void {
    this.currentTokenSubject.next(null);
  }

}
