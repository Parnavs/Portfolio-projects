import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {
  Observable,
  Subject,
  Subscription,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs';
import { ContentCategory } from 'src/app/enum/content-category.enum';
import { MoviesService } from 'src/app/service/movie.service';
import { TvService } from 'src/app/service/tv.service';

@Component({
  selector: 'app-content-page',
  templateUrl: './content-page.component.html',
  styleUrl: './content-page.component.scss',
})
export class ContentPageComponent implements OnInit, OnDestroy {
  public contents!: any[];
  public isLoading = true;
  public totalResults!: number;
  public searchStr?: string;
  public contentCategory!: ContentCategory;

  private currentPage: number = 1;
  private searchSubject = new Subject<string>();
  private subscription = new Subscription();

  constructor(
    private readonly movieService: MoviesService,
    private readonly tvService: TvService,
    private readonly route: ActivatedRoute,
  ) {}

  public ngOnInit(): void {
    this.setupSearchSubscription();
    this.setupRouteParamsSubscription();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public onSearchChange(searchString: string): void {
    this.searchSubject.next(searchString);
  }

  private setupSearchSubscription(): void {
    const searchSubscription = this.searchSubject
      .pipe(
        debounceTime(400),
        switchMap((searchString) =>
          this.setSearchedContents(searchString, this.currentPage),
        ),
      )
      .subscribe({
        next: (data) => this.handleData(data),
        error: (err) => this.handleError(err),
      });

    this.subscription.add(searchSubscription);
  }

  private setupRouteParamsSubscription(): void {
    const routeParamsSubscription = this.route.params
      .pipe(
        switchMap((params) => {
          this.handleReset();
          this.contentCategory = this.formatContentCategory(params['content']);
          return this.fetchData(this.contentCategory, '', 1);
        }),
      )
      .subscribe({
        next: (data) => this.handleData(data),
        error: (err) => this.handleError(err),
      });

    this.subscription.add(routeParamsSubscription);
  }

  private setSearchedContents(
    searchString: string,
    page: number = 1,
  ): Observable<any> {
    this.isLoading = true;

    return this.fetchData(this.contentCategory, searchString, page);
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
    this.currentPage = page;
    this.searchSubject.next(this.searchStr ?? '');
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
    this.currentPage = 1;
  }
}
