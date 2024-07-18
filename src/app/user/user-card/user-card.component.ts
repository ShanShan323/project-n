import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserVM } from '../user-vm';
import { User } from '../user-model/user.dto-model';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  @Input() user!: UserVM;
  @Output() deleteUser = new EventEmitter<UserVM>();
  @Output() editUser = new EventEmitter<UserVM>();

  onDelete() {
    this.deleteUser.emit(this.user);
  }

  onEdit() {
    this.editUser.emit(this.user);
  }
}
