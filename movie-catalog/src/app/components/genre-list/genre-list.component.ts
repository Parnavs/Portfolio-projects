import { Component } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ContentCategory } from 'src/app/enum/content-category.enum';
import { MoviesService } from 'src/app/service/movie.service';
import { TvService } from 'src/app/service/tv.service';

@Component({
  selector: 'app-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrl: './genre-list.component.scss'
})
export class GenreListComponent {
  public genreListMovies: any;
  public genreListTV: any;
  public isLoading = true;
  public ContentCategory = ContentCategory;

  constructor(
    private _movieService: MoviesService,
    private _tvService: TvService
  ) { }

  public ngOnInit(): void {
    forkJoin({
      movies: this._movieService.getGenres().pipe(
        catchError(err => {
          console.error('Error fetching movie genres', err);
          return of([]);
        })
      ),
      tvShows: this._tvService.getGenres().pipe(
        catchError(err => {
          console.error('Error fetching TV genres', err);
          return of([]);
        })
      )
    })
    .subscribe({
      next: (results) => {
        this.genreListMovies = results.movies.genres;
        this.genreListTV = results.tvShows.genres;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error in forkJoin', err);
        this.isLoading = false;
      }
    });
  }
}
