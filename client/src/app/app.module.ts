import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';

import { SignupComponent } from './auth/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from './auth/signin/signin.component';
import { RouterModule } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharelinkComponent } from './sharelink/sharelink.component';
import { ProfileComponent } from './sharelink/profile/profile.component';

import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { HomeComponent } from './sharelink/home/home.component';
import { SearchComponent } from './sharelink/search/search.component';
import { CreateComponent } from './sharelink/create/create.component';
import { MessageComponent } from './sharelink/message/message.component';
import { SidenavComponent } from './sharelink/sidenav/sidenav.component';
import { BodyComponent } from './sharelink/body/body.component';
import { PostComponent } from './component/post/post.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { EditProfileComponent } from './sharelink/edit-profile/edit-profile.component';
import { ConfirmComponent } from './component/confirm/confirm.component';
import { CookieService } from 'ngx-cookie-service';
import { UsersService } from './service/auth.service';
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    SignupComponent,
    SigninComponent,
    SharelinkComponent,
    ProfileComponent,
    HomeComponent,
    SearchComponent,
    CreateComponent,
    MessageComponent,
    SidenavComponent,
    BodyComponent,
    PostComponent,
    EditProfileComponent,
    ConfirmComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
      timeOut: 3000,
      easing: 'ease-in',
      easeTime: 700,
    }),
    BrowserAnimationsModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatIconModule,
  ],
  providers: [CookieService, UsersService],
  bootstrap: [AppComponent],
})
export class AppModule {}
