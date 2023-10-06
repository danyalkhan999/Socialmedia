import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from 'express';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

import { UsersService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(
    private users: UsersService,
    private toastr: ToastrService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  signupForm: FormGroup;

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  userSignup() {
    if (this.signupForm.valid) {
      const userData = this.signupForm.value;
      this.users.addNewUser(userData).subscribe(
        (res) => {
          console.log(res.user);

          // console.log(res.accessToken);
          // this.cookieService.set('userToken', res.accessToken);
          // this.toastr.success('Check email for OTP');
          // this.toastr.success('');
          // this.signupForm.reset();
        },
        (err) => {
          console.log('My err', err);
          this.toastr.error(err.error);
          // if (err.error === 'Username is not available') {
          //   this.toastr.error('Username is already in use', 'Invalid Username');
          // }
        }
      );

      // const { username, email, password } = userData;

      // console.log(username, email, password);

      // this.http.post("http://localhost:4000/api/auth")
      // TouchList.hfghds(payl)
      // this.users.addNewUser(userData);
    }
  }
}
