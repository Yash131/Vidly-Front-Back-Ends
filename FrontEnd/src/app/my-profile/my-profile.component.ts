import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
declare var $:any;
@Component({
  selector: "app-my-profile",
  templateUrl: "./my-profile.component.html",
  styleUrls: ["./my-profile.component.scss"],
})
export class MyProfileComponent implements OnInit {
  user$: any;
  modalEvent;
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.getProfileDetails()
  }

  getProfileDetails() {
    this.user$ = this.auth.getCurrentUser()
  }

  updateProfileBy(eventName){
    this.modalEvent = eventName
    $("#profileEdit").modal("show");
  }
}
