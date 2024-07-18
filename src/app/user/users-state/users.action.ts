import { createAction, props } from "@ngrx/store";
import { User } from "../user-model/user.dto-model";

export const initUsers = createAction('[User] Init Users');
export const loadUsersSuccess = createAction('[User/API] Load Users Success', props<{ users: User[] }>());
export const loadUsersFailure = createAction('[User/API] Load Users Success', props<{ error: any }>());

export const deleteUser = createAction('[User] Delete Users', props<{ id: number }>());

export const editUser = createAction('[User] Edit Users', props<{ user: User }>());

export const createUser = createAction('[User] Create Users', props<{ user: User }>());