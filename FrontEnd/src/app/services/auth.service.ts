import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LoginResponse, User } from "../models/user";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { JwtService } from "./jwt.service";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  helper = new JwtHelperService();

  constructor(private httpClient: HttpClient, private jwtService: JwtService) {}

  login(body: User): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(
      `${environment.api_url}auth`,
      body
    );
  }

  getCurrentUser() {
    return this.httpClient.get<User>(`${environment.api_url}users/current`);
  }

  getUserPayload() {
    const token = this.jwtService.getToken();
    if (token) {
      let payload = this.helper.decodeToken(token);
      return payload;
    } else {
      return null;
    }
  }

  isLoggedIn() {
    let userPayload = this.getUserPayload();
    if (userPayload) {
      return true;
    } else {
      return false;
    }
  }

}
