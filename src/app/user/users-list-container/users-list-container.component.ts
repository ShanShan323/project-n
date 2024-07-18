import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'
import { UsersListComponent } from "../users-list/users-list.component";
import { UserVM } from '../user-vm';
import { UserListStore } from './user-list-component.store';
import { UsersFacade } from '../users-state/users.facade';
import { LetDirective } from '@ngrx/component'
import { PushPipe } from '@ngrx/component';

@Component({
  selector: 'app-users-list-container',
  standalone: true,
  imports: [
    UsersListComponent,
    CommonModule,
    LetDirective,
    PushPipe,
  ],
  templateUrl: './users-list-container.component.html',
  styleUrl: './users-list-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers:[UserListStore, UsersFacade]
})
export class UsersListContainerComponent {
  private store = inject(UserListStore);
  public readonly users$ = this.store.users$;

  constructor(){
    this.read();
  }
  read() {
    this.users$.subscribe((res) => console.log('User-list-container',res));
  }

  onDelete(user:UserVM):void {
    this.store.deleteUser(user);
  };

  onEditUser(user:UserVM):void {
    this.store.editUser(user);
  };

  onAddUser() {
    this.store.addUser();
  }

}
