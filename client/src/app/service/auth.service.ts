import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  addNewUser(userData): Observable<any> {
    console.log('name', userData);

    return this.http.post(environment.BASEURL + 'auth/signup', userData);
  }

  loginUser(userData) {
    console.log('LOGIN', userData);
    return this.http.post(environment.BASEURL + 'auth/signin', userData);
  }

  logoutUser() {
    console.log('logout');

    return this.http.get(environment.BASEURL + 'auth/logout');
  }
}
