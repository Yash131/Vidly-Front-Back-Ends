import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { JwtService } from "../../services/jwt.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ReCaptchaV3Service } from "ng-recaptcha";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.css"],
})
export class SignInComponent implements OnInit {
  authForm: FormGroup;

  constructor(
    public router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private jwtService: JwtService,
    private _snackBar: MatSnackBar,
    private recaptchaV3Service: ReCaptchaV3Service,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    this.initForm();
    // let allCookies = this.cookieService.getAll();
    // console.log(allCookies)
  }

  onSubmit(token) {
    try {
      if (token) {
        this.authService.login(this.authForm.value).subscribe(
          (data) => {
            this.cookieService.set(
              "User_Email",
              this.authForm.get("email").value,
              {
                domain: "localhost",
                path : '/'
              }
            );
            let cookie = this.cookieService.get("User_Email");
            console.log(cookie);
            // console.log("login Works");
            this.jwtService.setToken(data.jwtToken);
            this.router.navigate([""]);
            (location.pathname = "");
            this._snackBar.open(`Hi, How You're Doing?`, "Success", {
              duration: 3000,
            });
          },
          (err) => {
            this._snackBar.open(`${err.error}`, "Failed", {
              duration: 3000,
            });
          }
        );
      } else {
        this._snackBar.open(`Somthing Went Wrong`, "Failed", {
          duration: 3000,
        });
      }
    } catch (e) {
      this._snackBar.open(`${e}`, "Failed", {
        duration: 3000,
      });
      console.log(e);
    }
  }

  private initForm() {
    this.authForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });
  }

  navigate() {
    this.router.navigateByUrl("user/signUp");
  }

  resolved($event) {}

  public executeLogin(): void {
    this.recaptchaV3Service.execute("login").subscribe((token) => {
      // console.log(token);
      this.onSubmit(token);
    });
  }
}
