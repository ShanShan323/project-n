import { Injectable, inject } from '@angular/core';
import { UsersApiServiceService } from './users-api-service.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../../user/user-model/user.dto-model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UsersServiceService {
  private usersApiService = inject(UsersApiServiceService);
  private localStorageService = inject(LocalStorageService);

  private usersSubject = new BehaviorSubject<User[]>([]);
  public readonly users$ = this.usersSubject.asObservable();

  constructor() {
    this.setUsers();
    console.log('consructor');
  }

  private getUsers(): User[] {
    return this.usersSubject.getValue();
  }

  private setUsers(): void {
    this.usersSubject.next(this.getlocalUsers());
  }

  private getlocalUsers(): User[] {
    const isEmpty = !this.localStorageService.getUsers()?.length;
    if (isEmpty) {
      this.updateUsers();
    }
    return this.localStorageService.getUsers();
  }

  private updateUsers(): void {
    this.usersApiService.getUsers().subscribe({
      next: (res) => {
        this.localStorageService.setUsers(JSON.stringify(res));
        this.usersSubject.next(this.getlocalUsers());
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteUser(id: number): void {
    const data = this.getUsers().filter((user) => user.id !== id);
    this.localStorageService.setUsers(JSON.stringify(data));
    this.setUsers();
    console.log(`user ${id} deleted`);
  }

  createUser(user: User): void {
    this.localStorageService.setUsers(
      JSON.stringify([...this.getUsers(), user])
    );
    this.setUsers();
    console.log(`user ${user.id} created`);
  }

  editUser(user: User): void {
    const data = this.getUsers().map((item) =>
      item.id === user.id ? user : item
    );
    this.localStorageService.setUsers(JSON.stringify(data));
    this.setUsers();
    console.log(`user ${user.id} updated`);
  }
}
