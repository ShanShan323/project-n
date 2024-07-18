import { User } from './user-model/user.dto-model';

export type UserVM = Readonly<Pick<User, 'id' | 'name'| 'username'| 'email'| 'phone'>>;

type UserAdapterVM = {
  adaptToVM(user: User): UserVM;
}

export const userAdapterVM: UserAdapterVM = {
  adaptToVM({id, name, username, email, phone}) {
    return {id, name, username, email, phone}
  }
}