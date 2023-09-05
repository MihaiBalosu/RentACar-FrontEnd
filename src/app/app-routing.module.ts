// app-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CarEditorComponent } from './car/car-editor/car-editor.component';
import { CarListComponent } from './car/car-list/car-list.component';
import { CarDealerListComponent } from './car-dealer/car-dealer-list/car-dealer-list.component';
import { AddOnListComponent } from './add-on/add-on-list/add-on-list/add-on-list.component';
import { CarProtectionListComponent } from './car-protection/car-protection-list/car-protection-list.component';
import { CarDetailsComponent } from './car/car-details/car-details.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RentalComponent } from './rental/rental.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cars-list', component: CarListComponent },
  { path: 'car-dealers-list', component: CarDealerListComponent },
  { path: 'add-on-list', component: AddOnListComponent },
  { path: 'car-protection-list', component: CarProtectionListComponent },
  { path: 'car/:id', component: CarDetailsComponent },
  { path: 'home-page', component: HomePageComponent },
  { path: 'rental', component: RentalComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
