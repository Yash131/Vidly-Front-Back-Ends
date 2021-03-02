import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Movies } from "../models/movies";

@Injectable({
  providedIn: "root",
})
export class MoviesService {
  private BASE_URL: string = "http://localhost:3000/api/";
  constructor(private httpClient: HttpClient) {}

  getMovies(genre): Observable<Movies[]> {
    return this.httpClient.get<Movies[]>(`${this.BASE_URL}movies/genre/${genre}`);
  }

  postMovie(body: Movies): Observable<Movies> {
    return this.httpClient.post<Movies>(`${this.BASE_URL}movies`, body);
  }

  getAMovie(id: string): Observable<Movies> {
    return this.httpClient.get<Movies>(`${this.BASE_URL}movies/admin/${id}`);
  }

  updateMovie(id: string, body: Movies): Observable<Movies> {
    return this.httpClient.put<Movies>(`${this.BASE_URL}movies/admin/${id}`, body);
  }

  deleteMovie(id: string): Observable<Movies> {
    return this.httpClient.delete<Movies>(`${this.BASE_URL}movies/admin/${id}`);
  }

  getUpcomingMovies(){
    return this.httpClient.get(`${this.BASE_URL}upcoming-movie/get`);
  }
}
