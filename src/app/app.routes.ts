import { Routes } from '@angular/router';
import { UsersListContainerComponent } from './user/users-list-container/users-list-container.component';

export const routes: Routes = [
  {
    path: 'users',
    component: UsersListContainerComponent,
  },
];
