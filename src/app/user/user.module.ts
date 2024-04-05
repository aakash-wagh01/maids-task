import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [UserListComponent, UserDetailsComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatCardModule,
    MatIconModule,
    InfiniteScrollModule,
  ],
})
export class UserModule {}
