import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'placeholder'
})
export class PlaceholderPipe implements PipeTransform {

  transform(value: string, isDefault: string = 'Sin texto'): any {
    return (value) ? value : isDefault;
  }

}
