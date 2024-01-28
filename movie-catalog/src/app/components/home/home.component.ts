import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, forkJoin } from 'rxjs';
import { delay } from 'rxjs/operators';
import { MoviesService } from 'src/app/service/movie.service';
import { TvService } from 'src/app/service/tv.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  nowPlaying: any;
  tvShows: any;
  responsiveOptions;
  loader = true;

  private subscription: Subscription = new Subscription()

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
    this.loadData();
  }

  private loadData(): void {
    this.subscription.add(
      forkJoin({
        movies: this.movies.getNowPlaying(1).pipe(delay(2000)),
        tvShows: this.tv.getTvOnTheAir(1).pipe(delay(2000))
      }).subscribe({
        next: (res) => {
          this.nowPlaying = res.movies.results;
          this.tvShows = res.tvShows.results;
          this.loader = false;
        },
        error: (err) => {
          console.error(err)
          this.loader = false;
        }
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
