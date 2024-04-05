import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { FilterService } from 'src/app/filter.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  page: number = 1;
  searchQuery: string = '';
  filteredUsers: any[] = [];
  query: string = '';
  loading: boolean = false;
  constructor(
    private apiService: ApiService,
    private router: Router,
    private filterService: FilterService
  ) {
    this.filterService.filter.subscribe((searchQuery: string) => {
      if (searchQuery !== null && searchQuery != '') {
        this.apiService.getUsers(0, searchQuery).subscribe({
          next: (data) => {
            let datas = data?.data;
            this.users = [];
            this.users.push(datas);
          },
          error: (err) => {
            console.error(err);
            this.users.length = 0;
          },
        });
      } else {
        this.getUserList(this.page);
      }
    });
  }

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList(pageSize: number = 1) {
    this.loading = true;
    this.apiService.getUsers(pageSize).subscribe({
      next: (data) => {
        this.loading = false;
        if (this.page === 1) {
          this.users = [];
          this.users = data?.data;
        } else {
          this.users = [...this.users, ...data?.data];
        }
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
      },
    });
  }

  goToUser(userId: number) {
    this.router.navigate([`/user-details/${userId}`]);
  }

  onScroll() {
    if (this.page > 1) {
      this.page = 1;
      return;
    } else {
      this.page = 2;
    }
    setTimeout(() => {
      this.getUserList(this.page);
    }, 500);
  }
}
