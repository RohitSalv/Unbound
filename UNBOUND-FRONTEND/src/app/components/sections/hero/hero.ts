import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class Hero implements OnInit, OnDestroy {
  userCount = 0;
  postCount = 0;
  communityCount = 0;
  
  displayUserCount = '0';
  displayPostCount = '0';
  displayCommunityCount = '0';

  private countInterval: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.animateCounters();
  }

  ngOnDestroy(): void {
    if (this.countInterval) {
      clearInterval(this.countInterval);
    }
  }

  onGetStarted(): void {
    this.router.navigate(['/signup']);
  }

  onWatchDemo(): void {
    // Handle watch demo action
    console.log('Watch demo clicked');
    // You can open a modal, navigate to demo page, or play a video
  }

  private animateCounters(): void {
    const targetUsers = 50000;
    const targetPosts = 1200000;
    const targetCommunities = 850;
    
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;
    
    const userStep = targetUsers / steps;
    const postStep = targetPosts / steps;
    const communityStep = targetCommunities / steps;

    let currentStep = 0;

    this.countInterval = setInterval(() => {
      if (currentStep < steps) {
        this.userCount = Math.floor(userStep * currentStep);
        this.postCount = Math.floor(postStep * currentStep);
        this.communityCount = Math.floor(communityStep * currentStep);

        this.displayUserCount = this.formatNumber(this.userCount);
        this.displayPostCount = this.formatNumber(this.postCount);
        this.displayCommunityCount = this.formatNumber(this.communityCount);

        currentStep++;
      } else {
        this.userCount = targetUsers;
        this.postCount = targetPosts;
        this.communityCount = targetCommunities;

        this.displayUserCount = this.formatNumber(targetUsers);
        this.displayPostCount = this.formatNumber(targetPosts);
        this.displayCommunityCount = this.formatNumber(targetCommunities);

        clearInterval(this.countInterval);
      }
    }, stepDuration);
  }

  private formatNumber(num: number): string {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M+';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K+';
    }
    return num.toString();
  }
}
