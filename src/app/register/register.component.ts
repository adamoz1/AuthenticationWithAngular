import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIcon
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  // Toggle password visibility
  hide = true;
  
  // Event handler for toggling password visibility
  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }

  // Initialize the registration form with validation rules
  registrationForm: FormGroup = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    uemail: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    gender: ['male', [Validators.required]],
    address: ['', [Validators.required]]
  });

  constructor(
    private formBuilder: FormBuilder, 
    private apiService: ApiService, 
    private router: Router 
  ) { }

  // Handle form submission
  async submitUser() {
    if (this.registrationForm.valid) {
      try {
        // Log form data
        console.log(this.registrationForm.value);

        // Prepare data for API call
        const data = JSON.stringify(this.registrationForm.value);

        // Call the API to register the user
        const response = await this.apiService.registerUser(data).toPromise();
        console.log(response);

        // Handle different response statuses
        if (response.status === 200) {
          alert("User Registered Successfully");
          this.router.navigate(['/']);
        } else if (response.status === 409) {
          alert("User Already Exists!!");
        } else {
          alert("Got some error!! Try again");
        }
      } catch (error) {
        // Handle any errors that occur during the API call
        console.error('Error during user registration:', error);
        alert("An error occurred during registration. Please try again.");
      }
    }
  }
}
