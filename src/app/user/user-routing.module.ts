import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';

const routes: Routes = [
  { path: 'user-list', component: UserListComponent },
  { path: 'user-details/:userId', component: UserDetailsComponent },
  { path: 'user-list', pathMatch: 'full', component: UserListComponent },
  // { path: '**', component: UserListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
