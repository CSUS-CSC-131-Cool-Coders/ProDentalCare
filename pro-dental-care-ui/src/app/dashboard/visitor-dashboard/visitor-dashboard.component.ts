import { Component } from '@angular/core';

@Component({
  selector: 'app-visitor-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './visitor-dashboard.component.html',
  styleUrls: ['./visitor-dashboard.component.css']
})
export class VisitorDashboardComponent {
  currentImageIndex: number = 0;

  showNextImage(): void {
    const images = document.querySelectorAll('.review-image');
    images[this.currentImageIndex].setAttribute('style', 'display: none;'); // Hide the current image
    this.currentImageIndex = (this.currentImageIndex + 1) % images.length; // Move to the next image
    images[this.currentImageIndex].setAttribute('style', 'display: block;'); // Show the next image
  }

  showPreviousImage(): void {
    const images = document.querySelectorAll('.review-image');
    images[this.currentImageIndex].setAttribute('style', 'display: none;'); // Hide the current image
    this.currentImageIndex = (this.currentImageIndex - 1 + images.length) % images.length; // Move to the previous image
    images[this.currentImageIndex].setAttribute('style', 'display: block;'); // Show the previous image
  }
}
