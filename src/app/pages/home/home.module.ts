import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { PipesModule } from '../../pipes/pipes.module';
import { AutoHideDirective } from '../../directives/auto-hide.directive';
import { PopInfoComponent } from '../../components/modals/pop-info/pop-info.component';
import { ModalsModule } from 'src/app/components/modals/modals.module';

@NgModule({
  entryComponents: [
    PopInfoComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    PipesModule,
    ModalsModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: HomePage }])
  ],
  declarations: [HomePage, AutoHideDirective]
})
export class HomePageModule { }
