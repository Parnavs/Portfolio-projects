import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TvService {
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

  public getTvOnTheAir(page: number): Observable<any> {
    return this.http.get(
      `${this.baseUrl}tv/on_the_air?api_key=${this.apiKey}&page=${page}&language=${this.language}`,
    );
  }

  public getTVAiringToday(page: number): Observable<any> {
    return this.http.get(
      `${this.baseUrl}tv/airing_today?api_key=${this.apiKey}&page=${page}&language=${this.language}`,
    );
  }

  public getPopularTVShow(page: number): Observable<any> {
    return this.http.get(
      `${this.baseUrl}tv/popular?api_key=${this.apiKey}&page=${page}&language=${this.language}`,
    );
  }

  public getTopRatedTVShows(page: number): Observable<any> {
    return this.http.get(
      `${this.baseUrl}tv/top_rated?api_key=${this.apiKey}&page=${page}&language=${this.language}`,
    );
  }

  public getTVShow(id: number): Observable<any> {
    return this.http.get(
      `${this.baseUrl}tv/${id}?api_key=${this.apiKey}&language=${this.language}`,
    );
  }

  public getTvVideos(id: number) {
    return this.http.get(
      `${this.baseUrl}tv/${id}/videos?api_key=${this.apiKey}&language=${this.language}`,
    );
  }

  public getTvBackdropsImages(id: number) {
    return this.http.get(
      `${this.baseUrl}tv/${id}/images?api_key=${this.apiKey}`,
    );
  }

  public getMovieCredits(id: number) {
    return this.http.get(
      `${this.baseUrl}tv/${id}/credits?api_key=${this.apiKey}&language=${this.language}`,
    );
  }

  public getGenres(): Observable<any> {
    return this.http.get(
      `${this.baseUrl}genre/tv/list?api_key=${this.apiKey}&language=${this.language}`,
    );
  }

  public getTVShowByGenre(id: number): Observable<any> {
    return this.http.get(
      `${this.baseUrl}discover/tv?api_key=${this.apiKey}&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&with_genres=${id}&include_null_first_air_dates=false`,
    );
  }

  public getRecomendTv(id: number): Observable<any> {
    return this.http.get(
      `${this.baseUrl}tv/${id}/recommendations?api_key=${this.apiKey}&language=${this.language}`,
    );
  }

  public searchtv(searchStr: string): Observable<any> {
    return this.http.get(
      `${this.baseUrl}search/tv?api_key=${this.apiKey}&query=${searchStr}`,
    );
  }
}
