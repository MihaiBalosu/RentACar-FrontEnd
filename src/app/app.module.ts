// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CarListComponent } from './car/car-list/car-list.component';
import { CarEditorComponent } from './car/car-editor/car-editor.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DealerEditorComponent } from './car-dealer/dealer-editor/dealer-editor.component';
import { AgmCoreModule } from '@agm/core';
import { CarDealerListComponent } from './car-dealer/car-dealer-list/car-dealer-list.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cars-list', component: CarListComponent },
  { path: 'car-dealers-list', component: CarDealerListComponent },


  // Define other routes here
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    CarListComponent,
    CarEditorComponent,
    CarListComponent,
    DealerEditorComponent,
    CarDealerListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule, 
    MatSelectModule,
    MatDialogModule,
    RouterModule.forRoot(appRoutes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCn3dK4iamN8xCBVJzVIvMwEbyRUdylRA4'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
