import { Component } from '@angular/core';
import { AuthenticationHttpService } from '../http-service/authentication-http.service';
import { User } from '../model/User';
import { RoleEnum } from '../model/RoleEnum';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerData = {
    username: '',
    email: '',
    password: ''
  };

  hidePassword = true;

  constructor(
    private readonly authenticationHttpService: AuthenticationHttpService,
    // private readonly toastr: ToastrService
  ) {
  }

  onRegisterSubmit() {
    let registeredUser: User = new User( 
      this.registerData.username, 
      this.registerData.email, 
      this.registerData.password, 
      RoleEnum.USER)

      this.authenticationHttpService.register(registeredUser).subscribe({
        next: user => {
          console.log("Success");
        },
        error: err => console.log("Error")
      });  
    }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}
