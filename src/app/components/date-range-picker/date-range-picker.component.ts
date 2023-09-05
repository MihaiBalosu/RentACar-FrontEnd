import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CarHttpService } from 'src/app/http-service/car-http.service';

@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.css']
})
export class DateRangePickerComponent implements OnInit{
  @Input() carId: number | null = null; 
  @Input("form")
  formGroup: FormGroup;
  unavailableDates: Date[];

  constructor(
    private readonly carHttpService: CarHttpService) {
  }

  ngOnInit(): void {
    this.getUnavailableDates();
  }

unavailableDatesFilter = (d: Date | null): boolean => {
  if(this.carId){
    if (!d) {
      return true; 
    }
    
    const time = d.getTime();
    return !this.unavailableDates.find(x => x.getTime() === time);
  }
  return true;
}

  getUnavailableDates() {
    if(this.carId){
      this.carHttpService.getUnavailableDates(this.carId).subscribe({
        next: unavailableDates => {
          this.unavailableDates = unavailableDates;
          console.log("Success");
        },
        error: () => console.log("Error")
      });
    }
  }

  isDateUnavailable(date: Date): boolean {
    return this.unavailableDates.some(unavailableDate =>
      date.getFullYear() === unavailableDate.getFullYear() &&
      date.getMonth() === unavailableDate.getMonth() &&
      date.getDate() === unavailableDate.getDate()
    );
  }

  endDateSelected(event: any) {
    const endDate = event.value;
    const isUnavailableDatePresentInInterval = this.unavailableDates.find(unavailableDate => unavailableDate <= endDate && unavailableDate >= this.formGroup.get("startDate")?.value);
    if(isUnavailableDatePresentInInterval){
      this.formGroup.get("startDate")?.setValue(endDate)
      this.formGroup.get("endDate")?.setValue(null);
    }
  }
}
