import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { MoviesService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrl: './genre.component.scss'
})
export class GenreComponent implements OnInit {
  public moviesGenre: any[] = [];
  public title!: string;
  public id!: number;
  public loader = true;

  constructor(
    private movieService: MoviesService,
    private route: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    this.route.params
    .pipe(
      switchMap(params => {
          this.id = params['id'];
          this.title = params['name'];
          return this.movieService.getMoviesByGenre(this.id).pipe(delay(2000));
        }))
    .subscribe({
        next: (res) => {
          this.moviesGenre = res.results;
          this.loader = false;
        },
        error: (err) => {
          console.error(err)
          this.loader = false;
        }
      })

  }

  public trackByMovieId(index: number, movie: any): number {
    return movie.id;
  }

  public getMoviePosterUrl(posterPath: string): string {
    return `https://image.tmdb.org/t/p/w370_and_h556_bestv2/${posterPath}`;
  }

}
