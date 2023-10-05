import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css'],
})
export class ConfirmComponent {
  constructor(
    private userService: UsersService,
    private cookie: CookieService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  logout() {
    this.userService.logoutUser().subscribe((res) => {
      console.log(res);
      this.cookie.delete('userToken', '/');
      this.router.navigate(['auth/signin']);
      this.toastr.success('Logged Out');
    });
  }
}
