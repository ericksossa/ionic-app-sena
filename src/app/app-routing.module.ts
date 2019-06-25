import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth/auth.guard';

const routes: Routes = [
  { path: 'intro', loadChildren: './auth/intro/intro.module#IntroPageModule' },
  { path: 'login', loadChildren: './auth/login/login.module#LoginPageModule' },
  { path: '', redirectTo: 'intro', pathMatch: 'full' },
  {
    path: '', loadChildren: './pages/tabs/tabs.module#TabsPageModule',
    canActivate: [AuthGuard]
  },   
 
// <--importante


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
