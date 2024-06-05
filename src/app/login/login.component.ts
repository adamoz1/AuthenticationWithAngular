import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIcon
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  // Hide or show password
  hide = true;

  // Toggle password visibility
  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }

  // Form Group Validator for login form
  loginForm: FormGroup = this.formBuilder.group({
    uemail: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(1)]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) { }

  // Handle form submission
  submitUser() {
    if (this.loginForm.valid) {
      try {
        // Convert User Detail Object to String 
        const data = JSON.stringify(this.loginForm.value);

        // Call the API to log in the user
        this.apiService.loginUser(data).pipe(
          catchError(error => {
            // Handle errors from the API
            console.error('Error during login:', error);
            alert("An error occurred during login. Please try again.");
            return throwError(error);
          })
        ).subscribe(response => {
          console.log(response);

          // Handle different response statuses
          if (response.status === 200) {
            localStorage.setItem('detail', JSON.stringify(response.userDetail));
            this.router.navigate(['/home']);
          } else {
            alert("Invalid Credentials");
          }
        });
      } catch (error) {
        // Handle any errors that occur during form submission
        console.error('Error during form submission:', error);
        alert("An unexpected error occurred. Please try again.");
      }
    }
  }
}
