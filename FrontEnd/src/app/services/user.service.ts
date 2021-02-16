import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { User, RegUser } from "../models/user";
import { JwtService } from "./jwt.service";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private httpClient: HttpClient, private jwtService: JwtService) {}

  registerUser(body: RegUser){
    return this.httpClient.post<User>(`${environment.api_url}users`, body);
  }
}
