import { Component, OnInit } from '@angular/core';
import { CarouselResponsiveOptions } from 'primeng/carousel';
import { forkJoin } from 'rxjs';
import { delay } from 'rxjs/operators';
import { MoviesService } from 'src/app/service/movie.service';
import { TvService } from 'src/app/service/tv.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public nowPlaying: any;
  public tvShows: any;
  public responsiveOptions: CarouselResponsiveOptions[];
  public isLoading: boolean = true;

  constructor(
    private movies: MoviesService,
    private tv: TvService
  ) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }
  public ngOnInit(): void {
    this.initializeMovieAndTVShowData();
  }

  private initializeMovieAndTVShowData(): void {
    forkJoin({
      movies: this.movies.getNowPlaying(1).pipe(delay(2000)),
      tvShows: this.tv.getTvOnTheAir(1).pipe(delay(2000))
    }).subscribe({
      next: (res) => {
        this.nowPlaying = res.movies.results;
        this.tvShows = res.tvShows.results;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err)
        this.isLoading = false;
      }
    })
  }
}
