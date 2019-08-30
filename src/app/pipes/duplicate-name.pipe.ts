import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duplicateName'
})
export class DuplicateNamePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
