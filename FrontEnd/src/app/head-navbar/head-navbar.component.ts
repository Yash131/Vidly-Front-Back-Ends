import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { JwtService } from '../services/jwt.service';

@Component({
  selector: 'head-navbar',
  templateUrl: './head-navbar.component.html',
  styleUrls: ['./head-navbar.component.scss']
})
export class HeadNavbarComponent implements OnInit {
  user: User;
  iswebApp: boolean = true;
  isMobileApp: boolean = false;
  isTablet: boolean = false;
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    this.getScreenSize();
    this.getCurrentUserData()

    // let isLoggedIn = this.authService.isLoggedIn();
    // console.log(isLoggedIn);
  }

  getScreenSize() {
    let mobWidth = window.screen.width;
    if (mobWidth > 760) {
      this.iswebApp = true;
      this.isMobileApp = false;
      this.isTablet = false;
    }
    if (mobWidth < 760) {
      this.isMobileApp = true;
      this.iswebApp = false;
      this.isTablet = false;
    }

    if (760 < mobWidth && mobWidth < 1024) {
      this.isTablet = true;
      this.isMobileApp = false;
      this.iswebApp = false;
    }
  }

  logout() {
    this.jwtService.destroyToken();
    this.router.navigateByUrl("");
    location.pathname = "/user/signIn";
    this.cookieService.deleteAll("/", "localhost");
  }

  getCurrentUserData(){

    this.authService.getCurrentUser().subscribe(
      (data) => {
        this.user = data;

        this.cookieService.set("userInfo", JSON.stringify(this.user), {
          domain: "localhost",
          path: "/",
          expires: 1,
          sameSite: "Lax",
          secure: true,
          // expires : now.setTime(now.getTime() + (min*60*1000))
        });
        // let cookie = this.cookieService.get('userInfo')
        // console.log(cookie)
        console.log(this.cookieService.check("userInfo"));
      },
      (err) => {
        console.error(err.error);
      }
    );
  }

}
