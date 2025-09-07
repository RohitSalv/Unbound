import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';



interface Mood {
  name: string;
  emoji: string;
  bg: string;
  text: string;
  activeBg: string;
  activeText: string;
}

interface Post {
  content: string;
  mood: Mood;
  tags: string[];
  reactions: { emoji: string; name: string }[];
  reactionCount: number;
  commentCount: number;
  threadCount: number;
}

interface Channel {
  name: string;
  emoji: string;
  description: string;
  memberCount: string;
  postCount: number;
  activeCount: number;
  coverGradient: string;
}

interface Comment {
  content: string;
  timeAgo: string;
  reactions: string[];
  reactionCount: number;
}

@Component({
  selector: 'app-content-preview',
  imports: [FormsModule,CommonModule],
  templateUrl: './content-preview.html',
  styleUrl: './content-preview.css'
})
export class ContentPreview implements OnInit {
  isVisible = false;
  selectedMood = 'All';

  moods: Mood[] = [
    {
      name: 'All',
      emoji: '🌈',
      bg: 'bg-gray-100',
      text: 'text-gray-700',
      activeBg: 'bg-gray-200',
      activeText: 'text-gray-800'
    },
    {
      name: 'Happy',
      emoji: '😊',
      bg: 'bg-yellow-100',
      text: 'text-yellow-700',
      activeBg: 'bg-yellow-200',
      activeText: 'text-yellow-800'
    },
    {
      name: 'Funny',
      emoji: '😂',
      bg: 'bg-orange-100',
      text: 'text-orange-700',
      activeBg: 'bg-orange-200',
      activeText: 'text-orange-800'
    },
    {
      name: 'Confused',
      emoji: '🤔',
      bg: 'bg-purple-100',
      text: 'text-purple-700',
      activeBg: 'bg-purple-200',
      activeText: 'text-purple-800'
    },
    {
      name: 'Excited',
      emoji: '🤩',
      bg: 'bg-pink-100',
      text: 'text-pink-700',
      activeBg: 'bg-pink-200',
      activeText: 'text-pink-800'
    },
    {
      name: 'Chill',
      emoji: '😌',
      bg: 'bg-green-100',
      text: 'text-green-700',
      activeBg: 'bg-green-200',
      activeText: 'text-green-800'
    }
  ];

  allPosts: Post[] = [
    {
      content: "Why do we press harder on the remote when it's dying? 🤔",
      mood: this.moods[3], // Confused
      tags: ['#showerthoughts', '#random'],
      reactions: [
        { emoji: '💀', name: 'dead' },
        { emoji: '🤯', name: 'mindblown' },
        { emoji: '😂', name: 'laughing' }
      ],
      reactionCount: 127,
      commentCount: 23,
      threadCount: 5
    },
    {
      content: "I just ate ice cream for breakfast and I regret nothing 🍦✨",
      mood: this.moods[4], // Excited
      tags: ['#noregrets', '#breakfast', '#yolo'],
      reactions: [
        { emoji: '🔥', name: 'fire' },
        { emoji: '✨', name: 'sparkles' },
        { emoji: '🍦', name: 'icecream' }
      ],
      reactionCount: 89,
      commentCount: 15,
      threadCount: 3
    },
    {
      content: "If dogs could text… they wouldn't.",
      mood: this.moods[2], // Funny
      tags: ['#dogs', '#meme'],
      reactions: [
        { emoji: '😭', name: 'crying' },
        { emoji: '💀', name: 'dead' },
        { emoji: '🐕', name: 'dog' }
      ],
      reactionCount: 234,
      commentCount: 67,
      threadCount: 12
    },
    {
      content: "Just realized I've been happy for 3 whole minutes. New personal record! 🎉",
      mood: this.moods[1], // Happy
      tags: ['#progress', '#mentalhealth'],
      reactions: [
        { emoji: '🎉', name: 'party' },
        { emoji: '💪', name: 'strong' },
        { emoji: '❤️', name: 'love' }
      ],
      reactionCount: 156,
      commentCount: 34,
      threadCount: 7
    },
    {
      content: "Sunday vibes: pajamas all day, snacks within arm's reach, zero productivity planned 😌",
      mood: this.moods[5], // Chill
      tags: ['#sunday', '#vibes', '#selfcare'],
      reactions: [
        { emoji: '😌', name: 'chill' },
        { emoji: '🛋️', name: 'couch' },
        { emoji: '✨', name: 'perfect' }
      ],
      reactionCount: 198,
      commentCount: 45,
      threadCount: 8
    },
    {
      content: "Why is it called 'rush hour' when nobody's moving? Traffic makes no sense 🚗💨",
      mood: this.moods[3], // Confused
      tags: ['#traffic', '#life', '#questions'],
      reactions: [
        { emoji: '🤔', name: 'thinking' },
        { emoji: '🚗', name: 'car' },
        { emoji: '😤', name: 'frustrated' }
      ],
      reactionCount: 78,
      commentCount: 19,
      threadCount: 4
    }
  ];

  channels: Channel[] = [
    {
      name: 'Shower Thoughts 🚿',
      emoji: '🚿',
      description: 'Random ideas from the bathroom philosopher in you.',
      memberCount: '12.5k',
      postCount: 1847,
      activeCount: 234,
      coverGradient: 'bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600'
    },
    {
      name: 'Midnight Cravings 🌙',
      emoji: '🌙',
      description: 'Food confessions after 12 AM.',
      memberCount: '8.2k',
      postCount: 967,
      activeCount: 145,
      coverGradient: 'bg-gradient-to-br from-purple-400 via-pink-500 to-indigo-600'
    },
    {
      name: 'Meme Dump 😂',
      emoji: '😂',
      description: "The internet's favorite pastime.",
      memberCount: '25.7k',
      postCount: 3421,
      activeCount: 567,
      coverGradient: 'bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600'
    }
  ];

  threadComments: Comment[] = [
    {
      content: "Bro, this just blew my mind 🤯 I never thought about it this way!",
      timeAgo: '2m ago',
      reactions: ['💯', '🤯', '🔥'],
      reactionCount: 18
    },
    {
      content: "Wait wait wait... you're telling me we've been living a lie this whole time? 😱",
      timeAgo: '5m ago',
      reactions: ['😱', '💀', '😂'],
      reactionCount: 24
    },
    {
      content: "I'm starting a petition to change the English language because of this post 📝",
      timeAgo: '8m ago',
      reactions: ['😭', '✨', '📝'],
      reactionCount: 31
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isVisible = true;
    }, 200);
  }

  get filteredPosts(): Post[] {
    if (this.selectedMood === 'All') {
      return this.allPosts;
    }
    return this.allPosts.filter(post => post.mood.name === this.selectedMood);
  }

  selectMood(mood: string): void {
    this.selectedMood = mood;
  }

  onStartPosting(): void {
    this.router.navigate(['/create-post']);
  }

  onExploreMore(): void {
    this.router.navigate(['/explore']);
  }
}
