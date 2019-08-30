import { Pipe, PipeTransform } from '@angular/core';
import { stringify } from '@angular/compiler/src/util';

@Pipe({
  name: 'playerIndex'
})
export class PlayerIndexPipe implements PipeTransform {

  transform(value: any): any {
    const newValue = 'Player' + stringify(value + 1);
    return newValue;
  }

}
