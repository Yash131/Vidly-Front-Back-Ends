import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Movies } from "../models/movies";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class MoviesService {
  private BASE_URL: string = "http://localhost:3000/api/";
  constructor(private httpClient: HttpClient) {}

  getMovies(genre): Observable<Movies[]> {
    return this.httpClient.get<Movies[]>(`${environment.api_url}movies/genre/${genre}`);
  }

  postMovie(body: Movies): Observable<Movies> {
    return this.httpClient.post<Movies>(`${environment.api_url}movies`, body);
  }

  getAMovie(id: string): Observable<Movies> {
    return this.httpClient.get<Movies>(`${environment.api_url}movies/admin/${id}`);
  }

  updateMovie(id: string, body: Movies): Observable<Movies> {
    return this.httpClient.put<Movies>(`${environment.api_url}movies/admin/${id}`, body);
  }

  deleteMovie(id: string): Observable<Movies> {
    return this.httpClient.delete<Movies>(`${environment.api_url}movies/admin/${id}`);
  }

  getUpcomingMovies(){
    return this.httpClient.get(`${environment.api_url}upcoming-movie/get`);
  }

  addUpcomingMovies(data){
    return this.httpClient.post(`${environment.api_url}upcoming-movie/add`,data);
  }

  deleteUpcomingMovies(id){
    return this.httpClient.delete(`${environment.api_url}upcoming-movie/delete/${id}`);
  }
}
