// app-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CarEditorComponent } from './car/car-editor/car-editor.component';
import { CarListComponent } from './car/car-list/car-list.component';
import { CarDealerListComponent } from './car-dealer/car-dealer-list/car-dealer-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cars-list', component: CarListComponent },
  { path: 'car-dealers-list', component: CarDealerListComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
