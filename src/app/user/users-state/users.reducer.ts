import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import * as UsersActions from './users.action';
import { User } from '../user-model/user.dto-model';

export const USERS_FEATURE_KEY = 'users';

export interface UsersState extends EntityState<User> {
  selectedUserId?: number | string;
  error: string | null;
}

export const usersAdapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialUsersState: UsersState = usersAdapter.getInitialState({
  error: null
});

const reducer = createReducer(
  initialUsersState,
  on(UsersActions.initUsers, (state) => state),
  on(UsersActions.loadUsersSuccess, (state, { users }) => 
    usersAdapter.setAll(users, { ...state })
  ),
  on(UsersActions.loadUsersFailure, (state, { error }) => ({ ...state, error })),
  on(UsersActions.createUser, (state, { user }) =>
    usersAdapter.addOne({ ...user }, { ...state })
  ),
  on(UsersActions.deleteUser, (state, { id }) =>
    usersAdapter.removeOne(id, { ...state })
  ),
  on(UsersActions.editUser, (state, { user }) =>
    usersAdapter.updateOne(
      { 
        id: user.id,
        changes: user
      }, 
      { ...state })
  ),
);

export function usersReducer(state: UsersState | undefined, action: Action) {
  return reducer(state, action);
}
