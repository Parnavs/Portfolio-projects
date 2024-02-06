import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  public language: string;
  public region: string;

  private baseUrl: string;
  private apiKey: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'https://api.themoviedb.org/3/';
    this.apiKey = 'df8ee651cbe4722086e5fce054551395';
    this.language = 'en-US';
    this.region = 'NL';
  }

  public getNowPlaying(page: number): Observable<any> {
    return this.http.get(
      `${this.baseUrl}movie/now_playing?api_key=${this.apiKey}&page=${page}&language=${this.language}&region=${this.region}`,
    );
  }

  public searchMovies(searchStr: string): Observable<any> {
    return this.http.get(
      `${this.baseUrl}search/movie?api_key=${this.apiKey}&query=${searchStr}`,
    );
  }

  public getPopular(page: number): Observable<any> {
    return this.http.get(
      `${this.baseUrl}movie/popular?api_key=${this.apiKey}&page=${page}&language=${this.language}&region=${this.region}`,
    );
  }

  public getUpComingMovies(page: number): Observable<any> {
    return this.http.get(
      `${this.baseUrl}movie/upcoming?api_key=${this.apiKey}&page=${page}&language=${this.language}&region=${this.region}`,
    );
  }

  public getTopRatedMovies(page: number): Observable<any> {
    return this.http.get(
      `${this.baseUrl}movie/top_rated?api_key=${this.apiKey}&page=${page}&language=${this.language}&region=${this.region}`,
    );
  }

  public getDiscoverMovies(): Observable<any> {
    return this.http.get(
      `${this.baseUrl}discover/movie?api_key=${this.apiKey}`,
    );
  }

  public getGenres(): Observable<any> {
    return this.http.get(
      `${this.baseUrl}genre/movie/list?api_key=${this.apiKey}&language=${this.language}`,
    );
  }

  public getMoviesByGenre(id: number): Observable<any> {
    return this.http.get(
      `${this.baseUrl}genre/${id}/movies?api_key=${this.apiKey}`,
    );
  }

  public getMovie(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}movie/${id}?api_key=${this.apiKey}`);
  }

  public getMovieReviews(id: number): Observable<any> {
    return this.http.get(
      `${this.baseUrl}movie/${id}/reviews?api_key=${this.apiKey}`,
    );
  }

  public getMovieCredits(id: number): Observable<any> {
    return this.http.get(
      `${this.baseUrl}movie/${id}/credits?api_key=${this.apiKey}`,
    );
  }

  public getBackdropsImages(id: number): Observable<any> {
    return this.http.get(
      `${this.baseUrl}movie/${id}/images?api_key=${this.apiKey}`,
    );
  }

  public getMovieVideos(id: number): Observable<any> {
    return this.http.get(
      `${this.baseUrl}movie/${id}/videos?api_key=${this.apiKey}`,
    );
  }

  public getRecomendMovies(id: number): Observable<any> {
    return this.http.get(
      `${this.baseUrl}movie/${id}/recommendations?api_key=${this.apiKey}`,
    );
  }

  public getPersonDetail(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}person/${id}?api_key=${this.apiKey}`);
  }

  public getPersonExternalData(id: number) {
    return this.http.get(
      `${this.baseUrl}person/${id}/external_ids?api_key=${this.apiKey}`,
    );
  }

  public getPersonCast(id: number): Observable<any> {
    return this.http.get(
      `${this.baseUrl}person/${id}/movie_credits?api_key=${this.apiKey}`,
    );
  }
}
