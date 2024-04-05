import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  userId: string | null = null;
  users: any;
  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.getUserData(this.userId);
  }

  getUserData(id: any) {
    this.apiService.getUsers(0, id).subscribe({
      next: (data) => {
        this.users = data;
        this.users = this.users.data;
        console.log('usersData', this.users);
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      },
    });
  }
}
