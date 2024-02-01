import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subject, debounceTime, switchMap } from 'rxjs';
import { ContentCategory } from 'src/app/enum/content-category.enum';
import { MoviesService } from 'src/app/service/movie.service';
import { TvService } from 'src/app/service/tv.service';

@Component({
  selector: 'app-content-page',
  templateUrl: './content-page.component.html',
  styleUrl: './content-page.component.scss',
})
export class ContentPageComponent implements OnInit {
  public contents!: any[];
  public isLoading = true;
  public totalResults!: number;
  public searchStr?: string;
  private searchSubject = new Subject<string>();
  public contentCategory!: ContentCategory;

  constructor(
    private readonly movieService: MoviesService,
    private readonly tvService: TvService,
    private readonly route: ActivatedRoute,
  ) {
    this.searchSubject
      .pipe(debounceTime(300))
      .subscribe((searchString) => this.searchContents(searchString));
  }

  public ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          this.handleReset();
          this.contentCategory = this.formatContentCategory(params['content']);
          return this.fetchData(this.contentCategory, '', 1);
        }),
      )
      .subscribe({
        next: (data) => this.handleData(data),
        error: (err) => this.handleError(err),
      });
  }

  public searchContents(searchString: string): void {
    this.isLoading = true;
    this.fetchData(this.contentCategory, searchString, 1).subscribe({
      next: (data) => this.handleData(data),
      error: (err) => this.handleError(err),
    });
  }

  public onSearchChange(searchString: string): void {
    this.searchSubject.next(searchString);
  }

  private fetchTopRated(
    category: ContentCategory,
    page: number,
  ): Observable<any> {
    switch (category) {
      case ContentCategory.TV:
        return this.tvService.getTopRatedTVShows(page);
      case ContentCategory.Movie:
        return this.movieService.getTopRatedMovies(page);

      default:
        throw new Error(`Unsupported content category: ${category}`);
    }
  }

  public changePage(page: number): void {
    this.isLoading = true;
    this.fetchData(this.contentCategory, this.searchStr ?? '', page).subscribe({
      next: (data) => this.handleData(data),
      error: (err) => this.handleError(err),
    });
  }

  private formatContentCategory(category: string): ContentCategory {
    if (!category) {
      throw new Error('Content category is undefined');
    }

    const matchingCategory = Object.values(ContentCategory).find(
      (contentCategory) =>
        category.toLowerCase() === contentCategory.toLowerCase(),
    );

    if (!matchingCategory) {
      throw new Error('Invalid category');
    }

    return matchingCategory;
  }

  private fetchData(
    category: ContentCategory,
    searchString: string,
    page: number,
  ): Observable<any> {
    if (searchString) {
      switch (category) {
        case ContentCategory.TV:
          return this.tvService.searchtv(searchString);
        case ContentCategory.Movie:
          return this.movieService.searchMovies(searchString);
      }
    }

    return this.fetchTopRated(category, page);
  }

  private handleData(data: any): void {
    this.contents = data.results;
    this.totalResults = data.total_results;
    this.isLoading = false;
  }

  private handleError(err: any): void {
    console.error(err);
    this.isLoading = false;
  }

  private handleReset(): void {
    this.searchStr = '';
  }
}
