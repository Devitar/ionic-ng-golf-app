import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToArray'
})
export class NumberToArrayPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let result = [];
    for (let i = 0; i < value; i++) {
      result.push(i);
    }
    return result;
  }

}
