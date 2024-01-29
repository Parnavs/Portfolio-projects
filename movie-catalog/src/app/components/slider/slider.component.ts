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
  current = 0;
  movies_data: any;
  tv_shows: any;


  constructor(
    private movieService: MoviesService,
  ) { }

  ngOnInit() {
    this.getnowPlayingMovies(1);
    this.sliderTimer();
  }

  getnowPlayingMovies(page: number) {
    this.movieService.getNowPlaying(page)
    .pipe(delay(2000))
    .subscribe({
      next: (res) => this.movies_data = res.results,
      error: (err) => console.error(err)
    })
  }

  sliderTimer() {
    setInterval(() => {
      this.current = ++this.current % this.movies_data.length;
    }, 5000);
  }
}
