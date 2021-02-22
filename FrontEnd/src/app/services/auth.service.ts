import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LoginResponse, User } from "../models/user";
import { Observable, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { JwtService } from "./jwt.service";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  helper = new JwtHelperService();

  private _loginLogoutModalData = new Subject<any>();
  loginLogoutModalData$ = this._loginLogoutModalData.asObservable();

  constructor(
    private httpClient: HttpClient,
    private jwtService: JwtService,
    private router: Router,
    private cookieService: CookieService
  ) {}

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

  sendLoginLogoutModalData(data) {
    this._loginLogoutModalData.next(data);
  }

  loggingOutUser() {
    this.jwtService.destroyToken();
    this.router.navigateByUrl("");
    location.pathname = "/user/signIn";
    this.cookieService.deleteAll("/", "localhost");
  }
}
