import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, first, switchMap } from 'rxjs';
import { ContentCategory } from 'src/app/enum/content-category.enum';
import { MoviesService } from 'src/app/service/movie.service';
import { TvService } from 'src/app/service/tv.service';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrl: './genre.component.scss'
})
export class GenreComponent implements OnInit {
  public genreList: any[] = [];
  public selectedGenre: string = '';
  public id: number = -1;
  public isLoading: boolean = true;

  public ContentCategory = ContentCategory;
  public selectedContentCategory!: ContentCategory

  constructor(
    private _movieService: MoviesService,
    private _tvService: TvService,
    private _route: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    this._route.params
      .pipe(
        first(),
        switchMap((params: Params) => {
          this.id = +params['id'];
          this.selectedGenre = params['name'];
          this.selectedContentCategory = this.formatContentCategory(params['content']);

          return this.fetchContentByCategory(this.selectedContentCategory, this.id);
        })
      )
      .subscribe({
        next: (res) => {
          this.genreList = res.results;
          this.isLoading = false;
        },
        error: (err) => {
          console.error(err);
          this.isLoading = false;
        }
      })
  }

  public getDetailLink(item: any): string {
    switch (this.selectedContentCategory) {
      case ContentCategory.Movie:
        return `/Movie/${item.id}`;
      case ContentCategory.TV:
        return `/TV/${item.id}`;
      default:
        throw new Error('Invalid content category');
    }
  }

  public getMediaPosterUrl(posterPath: string): string {
    return `https://image.tmdb.org/t/p/w370_and_h556_bestv2/${posterPath}`;
  }

  public trackByItemId(index: number, item: any): number {
    return item.id;
  }

  private fetchContentByCategory(category: ContentCategory, id: number): Observable<any> {
    switch (category) {
      case ContentCategory.Movie:
        return this._movieService.getMoviesByGenre(id);
      case ContentCategory.TV:
        return this._tvService.getTVShowByGenre(id);
      default:
        throw new Error('Invalid content category');
    }
  }

  private formatContentCategory(category: string): ContentCategory {
    const matchingCategory = Object.values(ContentCategory).find(
      contentCategory => category.toLowerCase() === contentCategory.toLowerCase()
    );
  
    if (!matchingCategory) {
      throw new Error('Invalid category');
    }
  
    return matchingCategory;
  }
}
