import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';


interface Testimonial {
  quote: string;
  username: string;
  location: string;
  mood: {
    emoji: string;
    name: string;
  };
  avatar: {
    emoji: string;
    gradient: string;
  };
}

interface TrustIndicator {
  icon: string;
  title: string;
  description: string;
}

interface Stats {
  posts: number;
  dailyVibes: number;
  moods: number;
}

interface DisplayStats {
  posts: string;
  dailyVibes: string;
  moods: string;
}


@Component({
  selector: 'app-social-proof',
  imports: [CommonModule],
  templateUrl: './social-proof.html',
  styleUrl: './social-proof.css'
})
export class SocialProof implements OnInit, OnDestroy {
  isLoaded = false;
  private isBrowser: boolean;
  private countInterval: any;

  // Static data for SSR compatibility
  stats: Stats = {
    posts: 47500,
    dailyVibes: 1250,
    moods: 35
  };

  displayStats: DisplayStats = {
    posts: '47.5K',
    dailyVibes: '1.2K',
    moods: '35'
  };

  testimonials: Testimonial[] = [
    {
      quote: "Finally, a place where I can say anything without being judged!",
      username: "NightOwl_Anonymous",
      location: "Somewhere in the void",
      mood: { emoji: '😌', name: 'Relieved' },
      avatar: { 
        emoji: '🦉', 
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
      }
    },
    {
      quote: "It's like Twitter, but with vibes and zero pressure.",
      username: "ChillVibesOnly",
      location: "Cloud 9",
      mood: { emoji: '✨', name: 'Peaceful' },
      avatar: { 
        emoji: '🌙', 
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' 
      }
    },
    {
      quote: "I came for the memes, stayed for the late-night thoughts.",
      username: "MidnightThinker",
      location: "3AM thoughts",
      mood: { emoji: '🤔', name: 'Contemplative' },
      avatar: { 
        emoji: '🧠', 
        gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' 
      }
    },
    {
      quote: "This community gets me. No fake smiles, just real vibes.",
      username: "AuthenticSoul",
      location: "Being myself",
      mood: { emoji: '💫', name: 'Authentic' },
      avatar: { 
        emoji: '⭐', 
        gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' 
      }
    },
    {
      quote: "Best decision ever: joining this anonymous playground!",
      username: "HappyCamper99",
      location: "Happy place",
      mood: { emoji: '🎉', name: 'Excited' },
      avatar: { 
        emoji: '🎭', 
        gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' 
      }
    },
    {
      quote: "My social anxiety thanks you for creating this safe space.",
      username: "QuietButLoud",
      location: "In my comfort zone",
      mood: { emoji: '💙', name: 'Grateful' },
      avatar: { 
        emoji: '🦋', 
        gradient: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)' 
      }
    }
  ];

  trustIndicators: TrustIndicator[] = [
    {
      icon: '🛡️',
      title: 'Safe Space',
      description: 'Zero tolerance for harassment or hate'
    },
    {
      icon: '🤝',
      title: 'Respectful',
      description: 'Community-driven moderation'
    },
    {
      icon: '🌈',
      title: 'Inclusive',
      description: 'All voices and identities welcome'
    },
    {
      icon: '⚡',
      title: 'Active',
      description: '24/7 engagement across time zones'
    }
  ];

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    // Set initial display values for SSR
    this.setInitialStats();
    
    // Only run animations in browser
    if (this.isBrowser) {
      setTimeout(() => {
        this.isLoaded = true;
        this.animateCounters();
      }, 300);
    } else {
      // For SSR, just show final values immediately
      this.isLoaded = true;
    }
  }

  ngOnDestroy(): void {
    if (this.countInterval) {
      clearInterval(this.countInterval);
    }
  }

  private setInitialStats(): void {
    // Set static values that work for both SSR and CSR
    this.displayStats = {
      posts: '47.5K+',
      dailyVibes: '1.2K+',
      moods: '35+'
    };
  }

  private animateCounters(): void {
    if (!this.isBrowser) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;
    
    const targetPosts = 47500;
    const targetVibes = 1250;
    const targetMoods = 35;
    
    const postStep = targetPosts / steps;
    const vibeStep = targetVibes / steps;
    const moodStep = targetMoods / steps;

    let currentStep = 0;
    let currentPosts = 0;
    let currentVibes = 0;
    let currentMoods = 0;

    this.countInterval = setInterval(() => {
      if (currentStep < steps) {
        currentPosts = Math.floor(postStep * currentStep);
        currentVibes = Math.floor(vibeStep * currentStep);
        currentMoods = Math.floor(moodStep * currentStep);

        this.displayStats = {
          posts: this.formatNumber(currentPosts),
          dailyVibes: this.formatNumber(currentVibes),
          moods: currentMoods.toString() + '+'
        };

        currentStep++;
      } else {
        this.displayStats = {
          posts: this.formatNumber(targetPosts) + '+',
          dailyVibes: this.formatNumber(targetVibes) + '+',
          moods: targetMoods.toString() + '+'
        };
        
        clearInterval(this.countInterval);
      }
    }, stepDuration);
  }

  private formatNumber(num: number): string {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  }

  onJoinCommunity(): void {
    this.router.navigate(['/signup']);
  }

  onLearnMore(): void {
    this.router.navigate(['/about']);
  }
}
