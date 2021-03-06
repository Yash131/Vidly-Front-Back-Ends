import { Injectable, OnInit } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { JwtService } from "../services/jwt.service";
import { AuthService } from "../services/auth.service";
import { User } from "../models/user";

@Injectable({
  providedIn: "root",
})
export class AdminAuthGuard implements CanActivate {
  user: any;
  isAdmin:boolean = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private jwtService: JwtService
  ) {
    // this.authService.getCurrentUser().subscribe(
    //   (data) => {
    //     this.user = data.isAdmin;
    //   }
    // );
    this.userData()
  }


  async userData(){
    this.user = this.authService.getUserPayload()
    // console.log(this.user)
    if(this.user){
      return this.isAdmin = this.user?.isAdmin;
    }else{
      return this.isAdmin = false;
    }

  }



  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.isAdmin === true) {
      return true;
    }
    this.router.navigateByUrl("");
    return false;
  }
}
