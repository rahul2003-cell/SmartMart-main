import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FeedbackService } from 'src/app/services/feedback.service';
import { Feedback } from 'src/app/models/feedback.model';
@Component({
  selector: 'app-adminviewfeedback',
  templateUrl: './adminviewfeedback.component.html',
  styleUrls: ['./adminviewfeedback.component.css']
})
export class AdminviewfeedbackComponent implements OnInit {



  displayedColumns: string[] = ['sno', 'username', 'message', 'rating', 'action'];
  dataSource = new MatTableDataSource<Feedback>(); 

  searchText: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private feedbackService: FeedbackService, private router: Router) {}

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  loadFeedbacks(): void {
    this.feedbackService.getAllFeedback().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.setCustomFilter();
      },
      error: (err) => {
        console.error('Error fetching feedback:', err);
      }
    });
  }

  viewProfile(userId: number): void {
    this.router.navigate(['/admin/user-profile', userId]);
  }

  applyFilters(): void {
    this.dataSource.filter = this.searchText.trim().toLowerCase();
  }

  setCustomFilter(): void {
    this.dataSource.filterPredicate = (data: Feedback, filter: string) => {
      const matchesSearch = data.user.username.toLowerCase().includes(filter);
      return matchesSearch;
    };
  }
}
