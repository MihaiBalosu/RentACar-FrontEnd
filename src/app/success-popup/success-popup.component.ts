import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success-popup',
  templateUrl: './success-popup.component.html',
  styleUrls: ['./success-popup.component.css']
})
export class SuccessPopupComponent {
  constructor(
    public dialogRef: MatDialogRef<SuccessPopupComponent>,
    private router: Router
  ) {}

  redirectToHome() {
    this.dialogRef.close();
    this.router.navigate(['/home-page']); // Replace '/home' with your actual home route
  }
}
