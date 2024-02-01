import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from './date.pipe';
import { NumberWithCommasPipe } from './number-with-commas.pipe';

@NgModule({
  declarations: [DatePipe, NumberWithCommasPipe],
  exports: [DatePipe, NumberWithCommasPipe],
  imports: [CommonModule],
})
export class PipeModule {}
