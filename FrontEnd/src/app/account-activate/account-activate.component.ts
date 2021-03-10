import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../services/user.service";

@Component({
  selector: "app-account-activate",
  templateUrl: "./account-activate.component.html",
  styleUrls: ["./account-activate.component.scss"],
})
export class AccountActivateComponent implements OnInit {
  token: string;
  loader: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get("token");
    // console.log(this.token);
  }

  activateAcc() {
    this.loader = false;
    if (this.token) {
      this.userService.activateAcc(this.token).subscribe(
        (res: any) => {
          this.loader = false;
          this.snackBar.open(res.message, "Success", {
            duration : 5000
          })
          this.router.navigateByUrl("user/signIn");
        },
        (err: any) => {
          this.loader = false;
          this.snackBar.open(err.message, "Failed", {
            duration : 5000
          })
        }
      );
    }else{
      this.loader = false;
      this.snackBar.open("No Activation Token!", "Failed", {
        duration : 5000
      })
    }
  }
}
