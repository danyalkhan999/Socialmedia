import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;

  constructor(
    private users: UsersService,
    private cookieService: CookieService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signinForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    if (this.signinForm.valid) {
      const signData = this.signinForm.value;

      this.users.loginUser(signData).subscribe(
        (res: any) => {
          console.log(res);
          // console.log(res.userToken);
          this.cookieService.set('userToken', res.userToken, {
            expires: 10,
            path: '/',
          });
          this.router.navigate(['sharelink/home']);
          this.toastr.success('Logged In');
        },
        (err) => {
          console.log(err);
          this.toastr.error('Error');
        }
      );
    }
  }
}
