import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { Genres } from "../models/genres";
import { JwtService } from "./jwt.service";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class GenresService {
  // BASE_URL: string = "http://localhost:3000/api/";

  private _genreSource = new Subject<any>();
  genreSource$ = this._genreSource.asObservable();

  constructor(private httpClient: HttpClient, private jwtService: JwtService) {}

  getGenres(): Observable<Genres[]> {
    return this.httpClient.get<Genres[]>(`${environment.api_url}genres`);
  }

  postGenres(body: Genres) {
    return this.httpClient.post(`${environment.api_url}genres`, body);
  }

  deleteGenre(id: string): Observable<Genres> {
    return this.httpClient.delete<Genres>(`${environment.api_url}genres/${id}`);
  }

  updateGenre(id: string, body:Genres): Observable<Genres> {
    return this.httpClient.put<Genres>(`${environment.api_url}genres/${id}`,body);
  }

  getGenreByID(id: string): Observable<Genres> {
    return this.httpClient.get<Genres>(`${environment.api_url}genres/${id}`);
  }

  sendGenreData(data){
    this._genreSource.next(data)
  }

}
// {
//   headers: new HttpHeaders().set("Authorization", this.jwtService.),
// }
