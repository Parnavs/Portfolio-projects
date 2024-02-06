import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from './date.pipe';
import { NumberWithCommasPipe } from './number-with-commas.pipe';
import { TimePipe } from './time.pipe';

@NgModule({
  declarations: [DatePipe, NumberWithCommasPipe, TimePipe],
  exports: [DatePipe, NumberWithCommasPipe, TimePipe],
  imports: [CommonModule],
})
export class PipeModule {}
