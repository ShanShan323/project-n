import { createFeatureSelector, createSelector } from '@ngrx/store';
import { USERS_FEATURE_KEY, UsersState, usersAdapter } from './users.reducer';

export const selectUsersState = createFeatureSelector<UsersState>(USERS_FEATURE_KEY);
const { selectAll, selectEntities } = usersAdapter.getSelectors();

export const selectAllUsers = createSelector(selectUsersState, (state: UsersState) => selectAll(state));