import { trigger, transition, style, animate } from '@angular/animations';
import { Component } from '@angular/core';
import { delay } from 'rxjs/operators';
import { MoviesService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [style({ opacity: 0 }), animate('0.5s', style({ opacity: 1 }))]),
      transition(':leave', [animate('0.5s', style({ opacity: 0 }))])
    ])
  ]
})
export class SliderComponent {
  public current = 0;
  public movieData: any;

  constructor(
    private movieService: MoviesService,
  ) { }

  public ngOnInit(): void {
    this.getNowPlayingMovies(1);
    this.sliderTimer();
  }

  private getNowPlayingMovies(page: number): void {
    this.movieService.getNowPlaying(page)
    .pipe(delay(2000))
    .subscribe({
      next: (res) => this.movieData = res.results,
      error: (err) => console.error(err)
    })
  }

  private sliderTimer(): void {
    setInterval(() => {
      this.current = ++this.current % this.movieData.length;
    }, 5000);
  }
}
