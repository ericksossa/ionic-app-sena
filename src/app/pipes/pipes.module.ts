import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaceholderPipe } from './placeholder/placeholder.pipe';
import { RelativeTimePipe } from './relative-time/relative-time.pipe';

@NgModule({
  declarations: [
    PlaceholderPipe,
    RelativeTimePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PlaceholderPipe,
    RelativeTimePipe
  ]
})
export class PipesModule { }
