import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  addNewUser(userData): Observable<any> {
    console.log('name', userData);
    return this.http.post('http://localhost:4000/api/auth/signup', userData);
  }
}
