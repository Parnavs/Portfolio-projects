import { Component, Input, OnInit } from '@angular/core';
import { ContentCategory } from 'src/app/enum/content-category.enum';

@Component({
  selector: 'app-genre-links',
  templateUrl: './genre-links.component.html',
  styleUrl: './genre-links.component.scss',
})
export class GenreLinksComponent implements OnInit {
  @Input() genresList!: any[];
  @Input() contentCategory!: ContentCategory;
  @Input() isLoading!: boolean;

  public title!: string;

  public ngOnInit(): void {
    this.title = `${this.contentCategory} Genres`;
  }
  public getGenreLink(genre: any): string {
    return `/genres/${this.contentCategory.toLowerCase()}/${genre.id}/${genre.name}`;
  }
}
