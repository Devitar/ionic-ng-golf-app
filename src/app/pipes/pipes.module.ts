import { NgModule } from '@angular/core';
import { NumberToArrayPipe } from './number-to-array.pipe';
import { DuplicateNamePipe } from './duplicate-name.pipe';

@NgModule({
declarations: [NumberToArrayPipe, DuplicateNamePipe],
imports: [],
exports: [NumberToArrayPipe, DuplicateNamePipe],
})

export class PipesModule {}
