import { Injectable, inject } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { UsersFacade } from '../users-state/users.facade';
import { UserVM, userAdapterVM } from '../user-vm';
import { tap } from 'rxjs';
import { User } from '../user-model/user.dto-model';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditUserComponent, DialogData } from '../create-edit-user/create-edit-user.component';

type UserListState = Readonly <{
  users: UserVM[]
}>

const initialState: UserListState = {
  users: []
}

@Injectable()
export class UserListStore extends ComponentStore<UserListState> {
  private dialog = inject(MatDialog)
  private readonly usersFacade = inject(UsersFacade);
  readonly users$ = this.select(({users}) => users);

  constructor() {
    super(initialState);
    this.usersFacade.init();
    this.setUserFromGlobalToLocalStore();
   }

   private setUserFromGlobalToLocalStore():void {
    this.effect(() => this.usersFacade.allUsers$.pipe(tap((users:User[]) => this.patchUsers(users))));
   }

   private patchUsers(users:User[]):void {
    this.patchState({
      users: users.map((user) => userAdapterVM.adaptToVM(user))
    });
   }

   public deleteUser(user:UserVM) {
    this.usersFacade.deleteUser(user.id);
   }

   public editUser(user:UserVM) {
    console.log('EditIsBegin')
    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      data: {
        isEdit: true,
        user,
      } as DialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.usersFacade.editUser(result as User);
    });
   }

   public addUser(){
    const dialogRef = this.dialog.open(CreateEditUserComponent, {
      data: {
        isEdit: false,
      } as DialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }
      this.usersFacade.createUser(result as User)
    });
   }
}
