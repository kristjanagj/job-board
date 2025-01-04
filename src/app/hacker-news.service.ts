import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HackerNewsService {
  private baseUrl = 'https://hacker-news.firebaseio.com/v0';

  constructor(private http: HttpClient) {}

  getJobPostIds(): Observable<number[]> {
    return this.http.get<number[]>(`${this.baseUrl}/jobstories.json`);
  }

  getJobPostMetadata(postId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/item/${postId}.json`);
  }

  getJobPostsMetadata(postIds: number[]): Observable<any[]> {
    const requests = postIds.map(id => this.getJobPostMetadata(id));
    return forkJoin(requests);
  }
}

