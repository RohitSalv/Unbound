import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-features',
  // It's good practice to mark it as standalone since imports array is empty
  // Assuming this is an Angular 17+ project setup
  standalone: true,
  imports: [],
  templateUrl: './features.html',
  styleUrl: './features.css'
})
export class Features implements OnInit {
  isVisible = false;

  // 1. Inject PLATFORM_ID to determine the execution environment
  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    // This setTimeout will run on both server and browser (Node.js has its own setTimeout)
    // but the DOM manipulation will only happen in the browser.
    setTimeout(() => {
      this.isVisible = true;
    }, 100);

    // 2. Call the setup method
    this.setupScrollAnimations();
  }

  onStartExploring(): void {
    this.router.navigate(['/explore']);
  }

  private setupScrollAnimations(): void {
    // 3. Use isPlatformBrowser to check if the code is running in a browser
    if (isPlatformBrowser(this.platformId)) {
      // This entire block of code will be skipped on the server (Node.js)
      // and only executed on the client (browser).
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-fade-in-up');
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        }
      );

      // Observe all feature cards.
      // document is a browser-specific object, so this must be inside the check.
      const featureCards = document.querySelectorAll('.group');
      featureCards.forEach((card) => {
        observer.observe(card);
      });
    }
  }
}