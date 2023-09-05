// login.component.ts
import { Component, ɵɵqueryRefresh } from '@angular/core';
import { AuthenticationHttpService } from '../http-service/authentication-http.service';
import { User } from '../model/User';
import { LoginResponse } from '../model/LoginResponse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };
  hidePassword: boolean = true;

  constructor(
    private readonly authenticationHttpService: AuthenticationHttpService,
    private router: Router) {
  }
  
  onLoginSubmit() {
    this.authenticationHttpService.login(this.loginData.email, this.loginData.password).subscribe({
      next: (result: LoginResponse) => {
        console.log("Success");
        localStorage.setItem("jwtToken", result.token);
        localStorage.setItem('currentUser', JSON.stringify(result.userDto));
        this.authenticationHttpService.setCurrentUser(result.userDto);
        this.authenticationHttpService.setCurrentToken(result.token);
        this.router.navigate(['/home-page']); 
      },
      error: err => console.log("Error")
    });  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}
