import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationHttpService } from '../http-service/authentication-http.service';
import { Router } from '@angular/router';
import { LoginResponse } from '../model/LoginResponse';
import { BaseOption } from '../model/BaseOption';
import { User } from '../model/User';
import { RoleEnum } from '../model/RoleEnum';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  hidePassword = true;
  rolesBaseOptions = this.toBaseList(RoleEnum)

  constructor(
    private readonly authenticationHttpService: AuthenticationHttpService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: []
    });
    
  }

  onRegisterSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    const registeredUser: User = new User();
    registeredUser.username = this.registerForm.value.username;
    registeredUser.email = this.registerForm.value.email;
    registeredUser.password = this.registerForm.value.password;


    if(this.isUserAdmin()){
      registeredUser.role = this.registerForm.value.role;
    }

    this.authenticationHttpService.register(registeredUser).subscribe({
      next: (result: LoginResponse) => {
        if(!this.isUserAdmin()){
          localStorage.setItem("jwtToken", result.token);
          localStorage.setItem('currentUser', JSON.stringify(result.userDto));
          this.authenticationHttpService.setCurrentUser(result.userDto);
          this.authenticationHttpService.setCurrentToken(result.token);
          this.router.navigate(['/home-page']); 
        }
      },
      error: err => console.log("Error")
    });
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  isUserAdmin(): boolean{
    const currentUser : User = JSON.parse(localStorage.getItem('currentUser') || '{}')
    return RoleEnum.ADMIN === currentUser.role;
  
  }

  toBaseList(enumeration: any) {
    const baseOptions: BaseOption[] = [];

    Object.keys(enumeration)
      .filter((key) => !Number(key) && key !== "0")
      .forEach(async (key) => {
        const translatedValue = enumeration[key];
        baseOptions.push(new BaseOption(key, translatedValue));
      });
    return baseOptions;
  }
}
