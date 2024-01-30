import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-genre-links',
  templateUrl: './genre-links.component.html',
  styleUrl: './genre-links.component.scss'
})
export class GenreLinksComponent {
  @Input() title!: string;
  @Input() genresList!: any[];
  @Input() isTvGenre: boolean = false;
  @Input() isLoading!: boolean;

  public getGenreLink(genre: any): string {
    return this.isTvGenre ? `/genres/tv/${genre.id}/${genre.name}` : `/genres/movie/${genre.id}/${genre.name}`;
  }
}
