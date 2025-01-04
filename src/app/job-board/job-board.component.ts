import { Component, OnInit } from '@angular/core';
import { HackerNewsService } from '../hacker-news.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-board.component.html',
  styleUrl: './job-board.component.css'
})

export class JobBoardComponent implements OnInit {
  jobPosts: any[] = [];
  allPostIds: number[] = [];
  currentIndex = 0;

  constructor(private hackerNewsService: HackerNewsService) {}

  ngOnInit(): void {
    this.loadInitialJobs();
  }

  loadInitialJobs(): void {
    this.hackerNewsService.getJobPostIds().subscribe(ids => {
      this.allPostIds = ids;
      this.loadMoreJobs();
    });
  }

  loadMoreJobs(): void {
    const nextPostIds = this.allPostIds.slice(this.currentIndex, this.currentIndex + 6);
    this.currentIndex += 6;

    this.hackerNewsService.getJobPostsMetadata(nextPostIds).subscribe(posts => {
      this.jobPosts = [...this.jobPosts, ...posts];
    });
  }

  getCardUrl(post: any): string {
    return post.url ? post.url : `https://news.ycombinator.com/item?id=${post.id}`;
  }

  getCompanyName(title: string): string {
    const match = title.match(/^(.*?)(\s+\(YC\d{2}\))?/);
    return match ? match[1] : 'Unknown Company';
  }

  getYCTag(title: string): string | null {
    const match = title.match(/\(YC\d{2}\)/);
    return match ? match[0] : null;
  }

  openJobLink(url: string): void {
    // Using window.open() in a safe manner
    window.open(url, '_blank');
  }
}
