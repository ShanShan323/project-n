import { Injectable, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as UsersActions from './users.action';
import * as UsersSelectors from './users.selectors';
import { User } from '../user-model/user.dto-model';

@Injectable()
export class UsersFacade {
    private readonly store = inject(Store);

    public readonly allUsers$ = this.store.pipe(select(UsersSelectors.selectAllUsers));

    init() {
        this.store.dispatch(UsersActions.initUsers());
    }

    deleteUser(id:number) {
        this.store.dispatch(UsersActions.deleteUser({ id }));
    }

    editUser(user: User) {
        this.store.dispatch(UsersActions.editUser({ user }));
    }

    createUser(user: User) {
        this.store.dispatch(UsersActions.createUser({ user }));
    }

}