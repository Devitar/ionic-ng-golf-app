import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeFirst'
})
export class CapitalizeFirstPipe implements PipeTransform {

  transform(value: string): string {
    if (value.length > 0) {
      const newValue = value.charAt(0).toUpperCase() + value.slice(1);
      return newValue;
    } else {
      return null;
    }
  }

}
