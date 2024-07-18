import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { UserCardComponent } from '../user-card/user-card.component';
import { CommonModule } from '@angular/common';
import {
  CreateEditUserComponent,
  DialogData,
} from '../create-edit-user/create-edit-user.component';
import { UserVM } from '../user-vm';
import { User } from '../user-model/user.dto-model';

@Component({
  selector: 'app-users-list',
  standalone: true,
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  imports: [UserCardComponent, CommonModule],
})
export class UsersListComponent {
  @Input() users!: UserVM[];
  @Output() deleteUser: EventEmitter<UserVM> = new EventEmitter<UserVM>();
  @Output() editUser: EventEmitter<UserVM> = new EventEmitter<UserVM>();
  @Output() addUser: EventEmitter<UserVM> = new EventEmitter<UserVM>();

  constructor(){
    console.log('user-list',this.users)
  }

  onDelete(user: UserVM) {
    this.deleteUser.emit(user);
  }

  onAddUser() {
    this.addUser.emit();
  }

  onEditUser(user: UserVM) {
    this.editUser.emit(user);
  }
}
