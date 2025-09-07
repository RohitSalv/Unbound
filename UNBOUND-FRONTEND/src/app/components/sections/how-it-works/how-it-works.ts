import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [],
  templateUrl: './how-it-works.html',
  styleUrl: './how-it-works.css'
})
export class HowItWorks implements OnInit {
  isVisible = false;

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isVisible = true;
    }, 200);

    this.setupScrollAnimations();
  }

  onTryItNow(): void {
    this.router.navigate(['/create-post']);
  }

  private setupScrollAnimations(): void {
    if (isPlatformBrowser(this.platformId)) {
    
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

      const stepCards = document.querySelectorAll('.group');
      stepCards.forEach((card) => {
        observer.observe(card);
      });
    }
  }
}