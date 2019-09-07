import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formConversion'
})
export class FormConversionPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    
    const newValue = value + args[0];

    return newValue;
  }

}
