import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UserService } from "src/app/services/user.service";
import { ReCaptchaV3Service } from "ng-recaptcha";

@Component({
  selector: "sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  isLoadig = false;
  passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private userService: UserService,
    private recaptchaV3Service: ReCaptchaV3Service,
  ) {}

  ngOnInit() {
    this.inItForm();
  }

  submitForm(token) {
    try{
      this.isLoadig = true;
      if(token){
        this.userService.registerUser(this.signUpForm.value).subscribe(
          (data:any) => {
            this.isLoadig = false;

            this._snackBar.open(
              `Hi ${this.signUpForm.value['name']} \n, ${data?.message}`,
              "Success",
              {
                duration: 4000,
              }
            );
            this.signUpForm.reset()
            // this.router.navigateByUrl("user/signIn");

          },
          (err) => {
            this.isLoadig = false;
            console.error(err);
            this._snackBar.open(`Error: ${err.error}`, "Failed", {
              duration: 2000,
            });

          }
        );
      }else{
        this.isLoadig = false;
        this._snackBar.open(`Error: No capcha token`, "Failed", {
          duration: 2000,
        });
      }
    }catch(err){
      this.isLoadig = false;
      console.error(err);
      this._snackBar.open(`Error: ${err}`, "Failed", {
        duration: 2000,
      });
    }

  }

  inItForm() {
    this.signUpForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(5)]],
      email: ["", [Validators.required, Validators.email]],
      password: [
        "",
        [Validators.required, Validators.pattern(this.passwordPattern)],
      ],
    });
  }

  navigate() {
    this.router.navigateByUrl("user/signIn");
  }

  public executeSignUp(): void {
    this.recaptchaV3Service.execute('signup')
      .subscribe((token) =>{
        // console.log(token);
        this.submitForm(token)
      }
    );
  }
}
