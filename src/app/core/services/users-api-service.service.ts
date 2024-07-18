import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../../user/user-model/user.dto-model';

@Injectable({
  providedIn: 'root',
})
export class UsersApiServiceService {
  private http = inject(HttpClient);
  private baseUrl = 'https://jsonplaceholder.typicode.com';

  getUsers() {
    console.log('http');
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }
}
