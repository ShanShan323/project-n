import { Routes } from '@angular/router';
import { UsersListComponent } from './user/users-list/users-list.component';
import { UserCardComponent } from './user/user-card/user-card.component';

export const routes: Routes = [
  {
    path: 'users',
    component: UsersListComponent,
  },
];
