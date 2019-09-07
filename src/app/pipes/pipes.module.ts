import { NgModule } from '@angular/core';
import { NumberToArrayPipe } from './number-to-array.pipe';
import { DuplicateNamePipe } from './duplicate-name.pipe';
import { CapitalizeFirstPipe } from './capitalize-first.pipe';
import { PlayerIndexPipe } from './player-index-pipe.pipe';
import { TotalIdPipe } from './total-id.pipe';
import { InputCellPipe } from './input-cell.pipe';
import { FormConversionPipe } from './form-conversion.pipe';

@NgModule({
declarations: [NumberToArrayPipe, DuplicateNamePipe, CapitalizeFirstPipe, PlayerIndexPipe, TotalIdPipe, InputCellPipe, FormConversionPipe],
imports: [],
exports: [NumberToArrayPipe, DuplicateNamePipe, CapitalizeFirstPipe, PlayerIndexPipe, TotalIdPipe, InputCellPipe, FormConversionPipe],
})

export class PipesModule {}
