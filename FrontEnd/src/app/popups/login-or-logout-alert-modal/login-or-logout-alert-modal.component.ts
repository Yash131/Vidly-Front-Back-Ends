import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
declare var $: any;
@Component({
  selector: 'app-login-or-logout-alert-modal',
  templateUrl: './login-or-logout-alert-modal.component.html',
  styleUrls: ['./login-or-logout-alert-modal.component.css']
})
export class LoginOrLogoutAlertModalComponent implements OnInit {
  subscribtions : Subscription;
  modalData:any;
  constructor( private authService : AuthService , private router : Router) { }

  ngOnInit(): void {
    this.subscribtions = this.authService.loginLogoutModalData$.subscribe(
      (res) => {
        this.modalData = res
      },
      (err) => {
        console.error(err)
      }
    )
  }

  loginRedirect(){
    this.router.navigate(['user/signIn'])
    $("#loginLogoutModal").modal("hide");
  }

  logout(){
    $("#loginLogoutModal").modal("hide");
    this.authService.loggingOutUser()
  }
}
