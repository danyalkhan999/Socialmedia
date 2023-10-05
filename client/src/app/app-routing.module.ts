import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';

import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SharelinkComponent } from './sharelink/sharelink.component';
import { ProfileComponent } from './sharelink/profile/profile.component';
import { MessageComponent } from './sharelink/message/message.component';
// import { CreateComponent } from './sharelink/create/create.component';
import { SearchComponent } from './sharelink/search/search.component';
import { HomeComponent } from './sharelink/home/home.component';
import { authGuardGuard } from './Guard/auth-guard.guard';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'signin', component: SigninComponent },
      { path: 'signup', component: SignupComponent },
      { path: '', redirectTo: 'signin', pathMatch: 'full' },
    ],
  },

  {
    path: 'sharelink',
    component: SharelinkComponent,
    canActivate: [authGuardGuard],
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'message', component: MessageComponent },
      // { path: 'create', component: CreateComponent },
      { path: 'search', component: SearchComponent },
      { path: 'home', component: HomeComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },

  { path: '', redirectTo: 'sharelink', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
