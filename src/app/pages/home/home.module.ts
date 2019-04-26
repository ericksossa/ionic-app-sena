import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { PipesModule } from '../../pipes/pipes.module';
import { AutoHideDirective } from '../../directives/auto-hide.directive';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    PipesModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: HomePage }])
  ],
  declarations: [HomePage, AutoHideDirective]
})
export class HomePageModule { }
