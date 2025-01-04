import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JobBoardComponent } from "./job-board/job-board.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [JobBoardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'job-board';
}
