import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { IgxPaginatorComponent } from 'igniteui-angular';
import { Car } from '../model/Car';
import { CarHttpService } from '../http-service/car-http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-carousel',
  templateUrl: './car-carousel.component.html',
  styleUrls: ['./car-carousel.component.css']
})
export class CarCarouselComponent implements OnInit{
  @ViewChild('paginator', { static: true }) 
    public paginator!: IgxPaginatorComponent;
    public cars: Car[] = [];
    public itemsPerPage = [3, 4, 5];

    constructor(public cdr: ChangeDetectorRef,
      private readonly carHttpService: CarHttpService,
      private router: Router) {
    }

  ngOnInit(): void {
    this.getCars();
  }

    // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
    ngAfterViewInit() {
        this.cdr.detectChanges();
    }

    getCars() {
      this.carHttpService.getAllCars().subscribe({
        next: carsList => {
          this.cars = carsList;
          console.log("Success");
        },
        error: () => console.log("Error")
      });
    }

    public get data() {
        let cars = this.cars;
        cars = this.paginator ?
        this.cars.slice(this.paginator.page * this.paginator.perPage,
            ((this.paginator.page * this.paginator.perPage) + this.paginator.perPage)) : cars;
        return cars;
    }

    public navigateToFirstPage() {
        this.paginator.page = 0;
    }

    public viewCar(car: Car){
      this.router.navigate(['/car', car.id]); 
    }

}
