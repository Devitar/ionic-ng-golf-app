import { NgModule } from '@angular/core';
import { NumberToArrayPipe } from './number-to-array.pipe';
import { DuplicateNamePipe } from './duplicate-name.pipe';
import { CapitalizeFirstPipe } from './capitalize-first.pipe';
import { PlayerIndexPipe } from './player-index-pipe.pipe';

@NgModule({
declarations: [NumberToArrayPipe, DuplicateNamePipe, CapitalizeFirstPipe, PlayerIndexPipe],
imports: [],
exports: [NumberToArrayPipe, DuplicateNamePipe, CapitalizeFirstPipe, PlayerIndexPipe],
})

export class PipesModule {}
