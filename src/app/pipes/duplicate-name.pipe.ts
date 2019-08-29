import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duplicateName'
})
export class DuplicateNamePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    const slot1 = document.getElementById('1');
    console.log(slot1);
    return null;
  }

}
