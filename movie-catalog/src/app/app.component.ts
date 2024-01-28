import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title: string = 'Paperclip Movies';
  public loading: boolean = false;
  public color: ThemePalette = 'warn';
  public mode: ProgressSpinnerMode = 'indeterminate';
  public value = 50;


  constructor(private router: Router) {
    this.router.events
    .pipe(
      filter((event: any) => event instanceof NavigationStart || event instanceof NavigationEnd),
      map((event: any) => event instanceof NavigationStart))
    .subscribe(isNavigationStart => {
      if (isNavigationStart) {
        this.loading = true;
      } else {
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      }
    });
  }
}
