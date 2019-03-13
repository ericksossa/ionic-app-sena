import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaceholderPipe } from './placeholder/placeholder.pipe';

@NgModule({
  declarations: [PlaceholderPipe],
  imports: [
    CommonModule
  ],
  exports: [
    PlaceholderPipe
  ]
})
export class PipesModule { }
