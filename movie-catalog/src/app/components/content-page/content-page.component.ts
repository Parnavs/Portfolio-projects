import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subject, debounceTime, first, switchMap } from 'rxjs';
import { ContentCategory } from 'src/app/enum/content-category.enum';
import { IContent } from 'src/app/interface/IMovie.interface';
import { MoviesService } from 'src/app/service/movie.service';
import { TvService } from 'src/app/service/tv.service';

@Component({
  selector: 'app-content-page',
  templateUrl: './content-page.component.html',
  styleUrl: './content-page.component.scss'
})
export class ContentPageComponent implements OnInit {
  public contents!: IContent[];
  public isLoading = true;
  public totalResults!: number;
  public searchRes!: IContent[];
  public searchStr?: string;
  private searchSubject = new Subject<string>();
  public contentCategory!: ContentCategory;

  constructor(
    private readonly movieService: MoviesService,
    private readonly tvService: TvService,
    private readonly route: ActivatedRoute
  ) {
    this.searchSubject.pipe(
      debounceTime(300)
    ).subscribe(searchString => this.searchContents(searchString));
  }

  public ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params) => {
        this.contentCategory = this.formatContentCategory(params['content']);
        return this.fetchInitialContents(1);
      })
    ).subscribe({
      next: (res) => {
        this.contents = res.results;
        this.totalResults = res.total_results;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  private fetchInitialContents(page: number): Observable<any> {
    return this.contentCategory === ContentCategory.Movie ?
           this.movieService.getTopRatedMovies(page) :
           this.tvService.getTopRatedTVShows(page);
  }

  public searchContents(searchString: string): void {
    if (!searchString) return;
    
    (this.contentCategory === ContentCategory.Movie ?
      this.movieService.searchMovies(searchString) :
      this.tvService.searchtv(searchString))
    .subscribe({
      next: (res) => this.searchRes = res.results,
      error: (error) => console.error('Error searching content:', error)
    });
  }

  public onSearchChange(searchString: string): void {
    this.searchSubject.next(searchString);
  }

  private formatContentCategory(category: string): ContentCategory {
    if (!category) {
      throw new Error('Content category is undefined');
    }
  
    const lowerCaseCategory = category.toLowerCase();
    const matchingCategory = Object.values(ContentCategory).find(
      contentCategory => lowerCaseCategory === contentCategory.toLowerCase()
    );
  
    if (!matchingCategory) {
      throw new Error('Invalid category');
    }
  
    return matchingCategory;
  }

  public changePage(page: number): void {
    this.isLoading = true;
    this.fetchInitialContents(page).subscribe({
      next: (res) => {
        this.contents = res.results;
        this.totalResults = res.total_results;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }
}