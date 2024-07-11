import { Component, inject } from '@angular/core';
import { UsersApiServiceService } from '../../core/services/users-api-service.service';
import { UsersServiceService } from '../../core/services/users-service.service';
import { UserCardComponent } from '../user-card/user-card.component';
import { CommonModule } from '@angular/common';
import { User } from '../../core/models/user.interface';
import { MatDialog } from '@angular/material/dialog';
import {
  CreateEditUserComponent,
  DialogData,
} from '../create-edit-user/create-edit-user.component';

@Component({
  selector: 'app-users-list',
  standalone: true,
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  imports: [UserCardComponent, CommonModule],
})
export class UsersListComponent {
  private usersApiService = inject(UsersApiServiceService);
  private usersService = inject(UsersServiceService);
  private dialog = inject(MatDialog);

  users$ = this.usersService.users$;

  deleteUser(user: User) {
    if (user.id) {
      this.usersService.deleteUser(user.id);
    }
  }

  addUser() {
    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      data: {
        isEdit: false,
      } as DialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }
      this.usersService.createUser(result);
    });
  }

  editUser(user: User) {
    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      data: {
        isEdit: true,
        user,
      } as DialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.usersService.editUser(result);
    });
  }
}
