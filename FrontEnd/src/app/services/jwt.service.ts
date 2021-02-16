import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class JwtService {
  constructor() {}

  setToken(token) {
   localStorage.setItem("jwt_token", token);
  }

  getToken() {
   return localStorage.getItem("jwt_token");
  }

  destroyToken() {
   localStorage.removeItem("jwt_token");
  }
}
