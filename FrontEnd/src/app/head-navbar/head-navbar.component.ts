import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { Subscription } from "rxjs";
import { User } from "../models/user";
import { AuthService } from "../services/auth.service";
import { CartService } from "../services/cart.service";
import { JwtService } from "../services/jwt.service";
import { UserService } from "../services/user.service";
declare var $: any;

@Component({
  selector: "head-navbar",
  templateUrl: "./head-navbar.component.html",
  styleUrls: ["./head-navbar.component.scss"],
})
export class HeadNavbarComponent implements OnInit, OnDestroy {
  user: User;
  iswebApp: boolean = true;
  isMobileApp: boolean = false;
  isTablet: boolean = false;
  totalItemInCart: any;
  subscriptions: Subscription;
  isLoggedIn;
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
    private router: Router,
    private cookieService: CookieService,
    private cartService: CartService,
    private userService : UserService
  ) {}

  ngOnInit() {
    this.getScreenSize();
    this.getCurrentUserData();
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.getTotalItem();
    }
    this.subscriptions = this.cartService.cartSource$.subscribe((res) => {
      // console.log(res)
      this.totalItemInCart = res?.products?.length;
    });

    this.subscriptions = this.userService.userInfoSource$.subscribe( (res) => {this.user = res} )
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

    if (this.isLoggedIn) {
      let data = {
        action: "logout",
        modalTitle: "Are you sure you want to logout?",
        text:
          `If you will logout you want be able to access the shopping cart or adding movies in the cart.`,
      };
      this.authService.sendLoginLogoutModalData(data);
      $("#loginLogoutModal").modal("show");
    }

  }

  getCurrentUserData() {
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
      },
      (err) => {
        console.error(err.error);
      }
    );
  }

  getTotalItem() {
    this.cartService.totalItemInCart().subscribe(
      (res: any) => {
        this.totalItemInCart = res.totalItems;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  goToCart() {
    if (!this.isLoggedIn) {
      let data = {
        action: "login",
        modalTitle: "Login First!",
        text:
          `In order to access the shopping cart or adding movies in the cart you have to login first.`,
      };
      this.authService.sendLoginLogoutModalData(data);
      $("#loginLogoutModal").modal("show");
    }else{
      this.router.navigate(["cart"])
    }

  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
