import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; // 1. Import RouterModule

// Interface definitions... (These are fine)
interface TrustIndicator {
  icon: string;
  title: string;
  description: string;
}

interface SocialLink {
  name: string;
  icon: string;
  url: string;
}

interface QuickLink {
  name: string;
  icon: string;
  url: string;
}

interface LegalLink {
  name: string;
  url: string;
}

interface CommunityStat {
  icon: string;
  count: string;
  label: string;
}

@Component({
  selector: 'app-final-cta',
  // 2. Add RouterModule to the imports array to provide the Router service
  standalone: true, // Assuming this is a standalone component
  imports: [CommonModule, RouterModule], 
  templateUrl: './final-cta.html',
  styleUrl: './final-cta.css'
})
export class FinalCta implements OnInit {
  isLoaded = false;
  currentYear = new Date().getFullYear();
  private isBrowser: boolean;

  trustIndicators: TrustIndicator[] = [
    { icon: '⚡', title: 'Instant', description: 'Start posting in seconds' },
    { icon: '🔒', title: 'Anonymous', description: 'Your privacy guaranteed' },
    { icon: '🌈', title: 'Inclusive', description: 'All voices welcome' },
    { icon: '💸', title: 'Free', description: 'No hidden costs, ever' }
  ];

  socialLinks: SocialLink[] = [
    { name: 'Twitter', icon: '🐦', url: 'https://twitter.com/unbound' },
    { name: 'Discord', icon: '💬', url: 'https://discord.gg/unbound' },
    { name: 'Reddit', icon: '🔗', url: 'https://reddit.com/r/unbound' },
    { name: 'GitHub', icon: '⚡', url: 'https://github.com/unbound' }
  ];

  quickLinks: QuickLink[] = [
    { name: 'How It Works', icon: '❓', url: '/how-it-works' },
    { name: 'Community Guidelines', icon: '📋', url: '/guidelines' },
    { name: 'Popular Channels', icon: '🔥', url: '/channels' },
    { name: 'Help & Support', icon: '💡', url: '/help' },
    { name: 'Feature Requests', icon: '💫', url: '/feedback' }
  ];

  legalLinks: LegalLink[] = [
    { name: 'About', url: '/about' },
    { name: 'Contact', url: '/contact' },
    { name: 'Terms', url: '/terms' },
    { name: 'Privacy', url: '/privacy' },
    { name: 'Cookies', url: '/cookies' }
  ];

  communityStats: CommunityStat[] = [
    { icon: '👥', count: '50K+', label: 'Active Users' },
    { icon: '📝', count: '500K+', label: 'Posts Shared' },
    { icon: '🌍', count: '150+', label: 'Countries' }
  ];

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      setTimeout(() => {
        this.isLoaded = true;
      }, 300);
    } else {
      this.isLoaded = true;
    }
  }

  onStartPosting(): void {
    if (this.isBrowser) {
      console.log('Final CTA: Start Posting clicked');
    }
    this.router.navigate(['/create-post']);
  }

  onExploreNow(): void {
    this.router.navigate(['/explore']);
  }
}