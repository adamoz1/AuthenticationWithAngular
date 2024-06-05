import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet, RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    MatButtonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  // Property to hold the current URL
  currentUrl: string = '';

  constructor(private router: Router) { }

  // Detect changes and update the current URL
  ngDoCheck() {
    this.currentUrl = this.router.url; // Get the current URL on every change detection cycle
  }

  // Method to clear local storage
  clearStorage() {
    try {
      localStorage.clear(); 
    } catch (error) {
      // Handle any errors that occur during the clearing of local storage
      console.error('Error clearing local storage:', error);
      alert('An error occurred while clearing storage. Please try again.');
    }
  }
}
