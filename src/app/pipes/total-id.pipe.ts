import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'totalId'
})
export class TotalIdPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    const newValue = value + 'Total' + args[0];
    return newValue;
  }

}
