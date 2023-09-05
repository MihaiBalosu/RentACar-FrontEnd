// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
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
import { CarDealerListComponent } from './car-dealer/car-dealer-list/car-dealer-list.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { AddOnListComponent } from './add-on/add-on-list/add-on-list/add-on-list.component';
import { AddOnEditorComponent } from './add-on/add-on-editor/add-on-editor/add-on-editor.component';
import { CarProtectionEditorComponent } from './car-protection/car-protection-editor/car-protection-editor.component';
import { CarProtectionListComponent } from './car-protection/car-protection-list/car-protection-list.component';
import { NavTabComponent } from './components/nav-tab/nav-tab.component';
import { CarCarouselComponent } from './car-carousel/car-carousel.component';
import { IgxButtonGroupModule, IgxButtonModule, IgxCardModule, IgxDateRangePickerModule, IgxIconModule, IgxPaginatorModule, IgxRippleModule } from 'igniteui-angular';
import { CarDetailsComponent } from './car/car-details/car-details.component';
import { HomePageComponent } from './home-page/home-page.component';
import { DateRangePickerComponent } from './components/date-range-picker/date-range-picker.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReviewComponent } from './review/review.component';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { MatCardModule } from '@angular/material/card';
import { ReviewListComponent } from './review-list/review-list.component';
import { MatListModule } from '@angular/material/list';
import { RentalComponent } from './rental/rental.component';
import { CustomerComponent } from './customer/customer.component';
import { SuccessPopupComponent } from './success-popup/success-popup.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cars-list', component: CarListComponent },
  { path: 'car-dealers-list', component: CarDealerListComponent },
  { path: 'add-on-list', component: AddOnListComponent },
  { path: 'car-protection-list', component: CarProtectionListComponent },
  { path: 'car/:id', component: CarDetailsComponent },
  { path: 'home-page', component: HomePageComponent },
  { path: 'rental', component: RentalComponent },

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
    CarDealerListComponent,
    AddOnListComponent,
    AddOnEditorComponent,
    CarProtectionEditorComponent,
    CarProtectionListComponent,
    NavTabComponent,
    CarCarouselComponent,
    CarDetailsComponent,
    HomePageComponent,
    DateRangePickerComponent,
    ReviewComponent,
    StarRatingComponent,
    ReviewListComponent,
    RentalComponent,
    CustomerComponent,
    SuccessPopupComponent
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
    GoogleMapsModule,
    IgxPaginatorModule,
	  IgxRippleModule,
    IgxButtonGroupModule,
    IgxButtonModule,
    MatNativeDateModule,
    IgxIconModule,
    IgxCardModule,
    IgxDateRangePickerModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatCardModule,
    MatListModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
