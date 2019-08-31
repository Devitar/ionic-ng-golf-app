import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inputCell'
})
export class InputCellPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    const newValue = value + args[0] + ' ' + 'gridCell3';
    return newValue;
  }

}
