import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  page: number = 1;
  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList(pageSize?: number) {
    this.apiService.getUsers(pageSize).subscribe({
      next: (data) => {
        if (this.page === 1) {
          this.users = data?.data;
        } else {
          this.users = [...this.users, ...data?.data];
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  goToUser(userId: number) {
    this.router.navigate([`/user-details/${userId}`]);
  }

  onScroll() {
    if (this.page > 1) {
      // Only fetch next page if page is greater than 1
      this.page = 2;
      return;
    } else {
      // For the first scroll down, we've already loaded page 1 data, so increment page to 2
      this.page = 2;
    }
    setTimeout(() => {
      this.getUserList(this.page);
    }, 500);
  }
}
