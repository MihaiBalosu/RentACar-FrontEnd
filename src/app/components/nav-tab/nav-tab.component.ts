import { Component, OnInit } from '@angular/core';
import { User } from '../../model/User';
import { AuthenticationHttpService } from '../../http-service/authentication-http.service';
import { RoleEnum } from 'src/app/model/RoleEnum';

@Component({
  selector: 'app-nav-tab',
  templateUrl: './nav-tab.component.html',
  styleUrls: ['./nav-tab.component.css']
})
export class NavTabComponent implements OnInit {
  navOpened: boolean = true;
  public currentUser: User | null = null;
  public token: String | null = null;

  constructor(private readonly authHttpService: AuthenticationHttpService) { 
    this.authHttpService.currentToken$.subscribe(token => {
      this.token = token;
    });  
      this.authHttpService.currentUser$.subscribe(user => {
        this.currentUser = user;
    });
  }

  ngOnInit(): void {
  }

  toggleNav(): void {
    this.navOpened = !this.navOpened;
  }

  public logout(): void {
    this.authHttpService.logout().subscribe({
      next: () => {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("currentUser");
        this.authHttpService.clearCurrentToken();
        this.authHttpService.clearCurrentUser();
      },
      error: (error) => console.log(error)
    });
  }

  public isRegisterButtonVisible(): boolean{
    const currentUser : User = JSON.parse(localStorage.getItem('currentUser') || '{}')
    return RoleEnum.ADMIN === currentUser.role
       || !currentUser.role;
  }
}
