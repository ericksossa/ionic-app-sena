import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfilePage } from './profile.page';
import { ModalsModule } from 'src/app/components/modals/modals.module';
import { EditProfileComponent } from 'src/app/components/modals/edit-profile/edit-profile.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ModalsModule,
    RouterModule.forChild([{ path: '', component: ProfilePage }])
  ],
  declarations: [ProfilePage],
  entryComponents: [EditProfileComponent]
})
export class ProfilePageModule { }
