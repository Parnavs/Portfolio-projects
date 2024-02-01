import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { SkeletonModule } from 'src/app/shared/skeleton/skeleton.module';
import { GenreLinksComponent } from './genre-links/genre-links.component';
import { GenreListRoutingModule } from './genre-list-routing-module';
import { GenreListComponent } from './genre-list.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [GenreListComponent, GenreLinksComponent],
  imports: [
    CommonModule,
    GenreListRoutingModule,
    MatButtonModule,
    SkeletonModule,
  ],
  exports: [GenreListComponent],
})
export class GenreListModule {}
