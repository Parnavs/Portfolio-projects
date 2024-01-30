import { Component } from '@angular/core';
import { delay } from 'rxjs/operators';
import { MoviesService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrl: './genre-list.component.scss'
})
export class GenreListComponent {
  public genreslist: any;
  public isLoading = true;

  constructor(
    private _movieService: MoviesService
  ) { }

  public ngOnInit(): void {
    this.initializeGenreList();
  }

  private initializeGenreList(): void {
    this._movieService.getGenres()
      .pipe(delay(2000))
      .subscribe({
        next: (res) => {
          this.genreslist = res.genres;
          this.isLoading = false;
        },
        error: (err) => {
          console.error(err)
          this.isLoading = false;
      }
    })
  }
}
