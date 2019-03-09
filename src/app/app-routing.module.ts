import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth/auth.guard';

const routes: Routes = [
  { path: 'login', loadChildren: './auth/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './auth/register/register.module#RegisterPageModule' },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '', loadChildren: './pages/tabs/tabs.module#TabsPageModule',
    canActivate: [AuthGuard]
  }, // <--importante
  {
    path: 'new-post', loadChildren: './pages/new-post/new-post.module#NewPostPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-profile', loadChildren: './pages/edit-profile/edit-profile.module#EditProfilePageModule',
    canActivate: [AuthGuard]
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
