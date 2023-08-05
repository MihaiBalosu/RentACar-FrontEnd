// login.component.ts
import { Component } from '@angular/core';
import { AuthenticationHttpService } from '../http-service/authentication-http.service';

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
  ) {
  }
  
  onLoginSubmit() {
    this.authenticationHttpService.login(this.loginData.email, this.loginData.password).subscribe({
      next: result => {
        console.log("Success");
        localStorage.setItem("jwtToken", result.token);
      },
      error: err => console.log("Error")
    });  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}
