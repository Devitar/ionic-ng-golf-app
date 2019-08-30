import { NgModule } from '@angular/core';
import { NumberToArrayPipe } from './number-to-array.pipe';
import { DuplicateNamePipe } from './duplicate-name.pipe';
import { CapitalizeFirstPipe } from './capitalize-first.pipe';

@NgModule({
declarations: [NumberToArrayPipe, DuplicateNamePipe, CapitalizeFirstPipe],
imports: [],
exports: [NumberToArrayPipe, DuplicateNamePipe, CapitalizeFirstPipe],
})

export class PipesModule {}
