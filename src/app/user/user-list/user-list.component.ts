import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(
    private apiService: ApiService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private filterService: FilterService
  ) {
    this.filterService.filter.subscribe((searchQuery: string) => {
      this.query = searchQuery;
      console.log('searchQuery', this.query);
      this.filteredUsers = this.users.filter((user) => user.id === searchQuery);
      console.log('SearchArray ', this.filteredUsers);
      this.getUserList();

      // this.filterUsers(searchQuery);
    });
  }

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList(pageSize?: number) {
    this.apiService.getUsers(pageSize).subscribe({
      next: (data) => {
        if (this.page === 1) {
          if (this.query && this.filteredUsers.length > 0) {
            this.users = this.filteredUsers;
          } else {
            this.users = data?.data;
          }
        } else {
          if (this.query && this.filteredUsers.length > 0) {
            this.users = this.filteredUsers;
          } else {
            this.users = [...this.users, ...data?.data];
          }
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  // filterUsers(searchQuery: string) {
  //   if (!searchQuery) {
  //     this.filteredUsers = [...this.users]; // If no search query, show all users
  //     console.log('filterdUsers', this.filteredUsers);
  //   } else {
  //     this.filteredUsers = this.users.filter((user) =>
  //       user.id.toString().includes(searchQuery)
  //     );
  //     console.log('filterdUsers', this.filteredUsers);
  //   }
  // }

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
