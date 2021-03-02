import { Injectable } from "@angular/core";
import { HttpClient, HttpEvent } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable, Subject } from "rxjs";
import { User, RegUser } from "../models/user";
import { JwtService } from "./jwt.service";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private _userInfoSource = new Subject<any>();
  userInfoSource$ = this._userInfoSource.asObservable();

  constructor(private httpClient: HttpClient, private jwtService: JwtService) {}

  registerUser(body: RegUser) {
    return this.httpClient.post<User>(`${environment.api_url}users`, body);
  }

  updatePassword(body) {
    return this.httpClient.post(
      `${environment.api_url}users/update-password`,
      body
    );
  }

  // uploadProfilePic(file) {
  //   const formData: FormData = new FormData();
  //   formData.append("file", file);

  //   console.log(file);
  //   console.log(formData);

  //   return this.httpClient.post( `${environment.api_url}users/profilePic`, formData)

  // }

  updateUserInfo(data) {
    return this.httpClient.post(
      `${environment.api_url}users/updateUserInfo`,
      data
    );
  }

  refreshUserInfo(data) {
    this._userInfoSource.next(data);
  }
}
