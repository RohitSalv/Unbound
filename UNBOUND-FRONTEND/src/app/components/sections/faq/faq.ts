import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';

interface FAQ {
  question: string;
  answer: string;
  icon: string;
  iconGradient: string;
  additionalInfo?: string;
  additionalIcon?: string;
  actionButton?: {
    text: string;
    emoji: string;
    action: string;
  };
}

interface QuickFAQ {
  question: string;
  answer: string;
  icon: string;
}


@Component({
  selector: 'app-faq',
  imports: [CommonModule],
  templateUrl: './faq.html',
  styleUrl: './faq.css'
})
export class Faq implements OnInit {
  isLoaded = false;
  expandedIndex = -1; // -1 means none expanded
  private isBrowser: boolean;

  faqs: FAQ[] = [
    {
      question: 'Do I need to sign up?',
      answer: 'Nope. Just post and vibe.',
      icon: '🚪',
      iconGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      additionalInfo: 'No emails, no passwords, no hassle — just pure expression!',
      additionalIcon: '✨'
    },
    {
      question: 'Is it really anonymous?',
      answer: '100% yes. No names, no judgment.',
      icon: '🎭',
      iconGradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      additionalInfo: 'Your privacy is our priority — we never track or store personal data.',
      additionalIcon: '🛡️'
    },
    {
      question: 'What can I post?',
      answer: 'Anything — thoughts, secrets, memes, rants. Be free, be kind.',
      icon: '💭',
      iconGradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      additionalInfo: 'Express yourself freely while keeping the community positive!',
      additionalIcon: '💫',
      actionButton: {
        text: 'Start Posting',
        emoji: '🚀',
        action: 'create-post'
      }
    },
    {
      question: 'Can I create my own community?',
      answer: 'Absolutely! Make a channel for your vibe.',
      icon: '🏠',
      iconGradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      additionalInfo: 'Build your own corner of the internet with custom themes and rules.',
      additionalIcon: '🎨',
      actionButton: {
        text: 'Create Channel',
        emoji: '🔨',
        action: 'create-channel'
      }
    },
    {
      question: 'How do moods work?',
      answer: 'Pick an emotion, let it guide your post, connect with similar vibes.',
      icon: '🎭',
      iconGradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      additionalInfo: 'Moods help you find posts that match your current energy level.',
      additionalIcon: '🎯'
    },
    {
      question: 'Is there moderation?',
      answer: 'Community-driven. Report bad vibes, we handle the rest.',
      icon: '👮',
      iconGradient: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
      additionalInfo: 'Our AI and community work together to keep things positive and safe.',
      additionalIcon: '🤝'
    }
  ];

  quickFaqs: QuickFAQ[] = [
    {
      question: 'Mobile app?',
      answer: 'Coming soon! Web works great for now.',
      icon: '📱'
    },
    {
      question: 'Age limit?',
      answer: '13+ with good vibes only.',
      icon: '🎂'
    },
    {
      question: 'Cost?',
      answer: 'Free forever. No premium nonsense.',
      icon: '💸'
    },
    {
      question: 'Dark mode?',
      answer: 'Of course! We respect night owls.',
      icon: '🌙'
    },
    {
      question: 'Notifications?',
      answer: 'Optional. Only get what you want.',
      icon: '🔔'
    },
    {
      question: 'Data usage?',
      answer: 'Minimal. Optimized for all connections.',
      icon: '📊'
    }
  ];

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    // Only run animations in browser
    if (this.isBrowser) {
      setTimeout(() => {
        this.isLoaded = true;
      }, 300);
    } else {
      // For SSR, just show content immediately
      this.isLoaded = true;
    }
  }

  toggleFaq(index: number): void {
    this.expandedIndex = this.expandedIndex === index ? -1 : index;
  }

  expandAll(): void {
    // For simplicity, just expand the first one and let users click through
    this.expandedIndex = 0;
  }

  collapseAll(): void {
    this.expandedIndex = -1;
  }

  get allExpanded(): boolean {
    return this.expandedIndex !== -1;
  }

  handleFaqAction(action: string): void {
    switch (action) {
      case 'create-post':
        this.router.navigate(['/create-post']);
        break;
      case 'create-channel':
        this.router.navigate(['/create-channel']);
        break;
      default:
        console.log('Unknown action:', action);
    }
  }

  onAskCommunity(): void {
    this.router.navigate(['/help']);
  }

  onJustTryIt(): void {
    this.router.navigate(['/explore']);
  }
}