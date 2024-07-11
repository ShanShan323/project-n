import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../core/models/user.interface';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  @Input() user!: User;
  @Output() deleteUser = new EventEmitter<User>();
  @Output() editUser = new EventEmitter<User>();

  delete() {
    this.deleteUser.emit(this.user);
  }

  edit() {
    this.editUser.emit(this.user);
  }
}
