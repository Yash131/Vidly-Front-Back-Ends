import { AfterViewInit, Component, OnInit } from "@angular/core";
import { Form, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { MustMatch } from "../helper/mustMatchValidator";
import { UserService } from "../services/user.service";

@Component({
  selector: "app-forgot-pass",
  templateUrl: "./forgot-pass.component.html",
  styleUrls: ["./forgot-pass.component.scss"],
})
export class ForgotPassComponent implements OnInit, AfterViewInit {
  resetPass: FormGroup;
  passResetRequest: FormGroup;

  isLoadig = false;
  passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
  token: any;
  showResetPass = false;
  helper = new JwtHelperService();
  payload: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get("resetPass");
    if (this.token) {
      this.resetPassForm();
      this.showResetPass = true;
      this.getPayload()
      this.resetPass.patchValue({
        email: this.payload?.email,
      });
    } else {
      this.showResetPass = false;
      this.passResetRequestForm();
    }

    console.log(this.token);
  }

  ngAfterViewInit() {}

  sendPassResetRequest() {
    this.isLoadig = true;
    try {
      if (!this.showResetPass) {
        this.userService
          .passResetRequest(this.passResetRequest.value.email)
          .subscribe(
            (res: any) => {
              console.log(res);
              this.isLoadig = false;
              this.resetForms();
              this.router.navigate([""]);
              this.snackBar.open(res.message, "Success", {
                duration: 10000,
              });
            },
            (err: any) => {
              console.log(err.message);
              this.isLoadig = false;
              this.resetForms();
              this.snackBar.open(err.message, "Failed", {
                duration: 10000,
              });
            }
          );
      }
    } catch (e) {
      console.log(e);
      this.isLoadig = false;
      this.snackBar.open(e, "Failed", {
        duration: 10000,
      });
    }
  }

  resetPassword() {
    this.isLoadig = true;
    try {
      if (this.showResetPass) {
        let obj = {
          token: this.token,
          password: this.resetPass.value.password,
        };

        this.userService.passReset(obj).subscribe(
          (res: any) => {
            console.log(res);
            this.isLoadig = false;
            this.resetForms();
            this.router.navigateByUrl("user/signIn");
            this.snackBar.open(res.message, "Success", {
              duration: 10000,
            });
          },
          (err: any) => {
            console.log(err.message);
            this.isLoadig = false;
            this.resetForms();
            this.snackBar.open(err.message, "Failed", {
              duration: 10000,
            });
          }
        );
      }
    } catch (e) {
      console.log(e);
      this.isLoadig = false;
      this.snackBar.open(e, "Failed", {
        duration: 10000,
      });
    }
  }

  resetPassForm() {
    this.resetPass = this.fb.group(
      {
        email: [""],
        password: [
          "",
          [Validators.required, Validators.pattern(this.passwordPattern)],
        ],
        re_password: [
          "",
          [
            Validators.required,
            Validators.pattern(this.resetPass?.value?.re_password),
          ],
        ],
      },
      {
        validator: MustMatch("password", "re_password"),
      }
    );
  }

  passResetRequestForm() {
    this.passResetRequest = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
    });
  }

  getPayload() {
    if (this.token) {
      this.payload = this.helper.decodeToken(this.token);
      return this.payload;
    } else {
      return null;
    }
  }

  resetForms() {
    if(this.token){
      this.resetPass.reset();
    }else{
      this.passResetRequest.reset();
    }
  }
}
