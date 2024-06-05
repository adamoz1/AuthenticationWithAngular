import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  // Hold user details from local storage
  objectDetail: any;
  name: string = '';

  constructor() {
    try {
      // Retrieve user details from local storage
      this.objectDetail = localStorage.getItem('detail');

      // Parse the user details if available
      if (this.objectDetail) {
        const parsedDetail = JSON.parse(this.objectDetail);
        this.name = parsedDetail.firstname;
      } else {
        console.error('No user details found in local storage');
      }
    } catch (error) {
      // Handle any errors that occur during retrieval or parsing
      console.error('Error retrieving or parsing user details from local storage:', error);
      alert('An error occurred while loading user details. Please log in again.');
    }
  }
}
