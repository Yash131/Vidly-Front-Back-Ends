import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FileSelectDirective, FileUploader } from "ng2-file-upload";
import { environment } from "src/environments/environment";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";

declare var $: any;
@Component({
  selector: "app-my-profile",
  templateUrl: "./my-profile.component.html",
  styleUrls: ["./my-profile.component.scss"],
})
export class MyProfileComponent implements OnInit {
  user: any;
  selectedFile: File = null;
  modalEvent;
  userProfileSectionForm;
  passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

  passwordUpadeForm;
  nameUpadeForm;
  mobileUpadeForm;
  emailUpadeForm;
  addressUpadeForm;
  profilePhotoUpdateForm;
  imageUrl: string | ArrayBuffer;
  attachmentList:any = [];

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.getProfileDetails();
    this.initForm();
  }

  getProfileDetails() {
    this.auth.getCurrentUser().subscribe(
      (res: any) => {
        this.user = res;
      },
      (e: any) => {
        console.log(e);
      }
    );
  }

  updateProfileBy(eventName) {
    this.modalEvent = eventName;
    $("#profileEdit").modal("show");
  }

  photoSelectInput(e: Event) {
    this.selectedFile = (e.target as HTMLInputElement).files[0];
    console.log(this.selectedFile);
    // this.profilePhotoUpdateForm.patchValue({
    //   file:  this.selectedFile
    // });
    // this.profilePhotoUpdateForm.get('file').updateValueAndValidity()
  }

  initForm() {
    this.passwordUpadeForm = this.fb.group({
      oldPassword: ["", Validators.required],
      newPassword: [
        "",
        [Validators.required, Validators.pattern(this.passwordPattern)],
      ],
    });

    this.nameUpadeForm = this.fb.group({
      name: ["", Validators.required],
    });

    this.mobileUpadeForm = this.fb.group({
      mobile: ["", Validators.required],
    });

    this.emailUpadeForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
    });

    this.addressUpadeForm = this.fb.group({
      address: ["", Validators.required],
    });
    this.profilePhotoUpdateForm = this.fb.group({
      file: [null, Validators.required],
    });
  }

  updateModalSaveBtn() {
    if (this.modalEvent == "Password") {
      this.updateUsrPassword();
    } else {
      console.log(this.modalEvent);
      this.updateUserInfos();
    }
  }

  updateUsrPassword() {
    console.log(this.passwordUpadeForm.value);

    this.userService.updatePassword(this.passwordUpadeForm.value).subscribe(
      (res: any) => {
        $("#profileEdit").modal("hide");
        this.snackBar.open(res.message, "Success", {
          duration: 3000,
        });
      },
      (e) => {
        $("#profileEdit").modal("hide");
        console.log(e.error.text);
        this.snackBar.open(e.error.text, "Failed", {
          duration: 3000,
        });
      }
    );
  }

  // updateProfilePic() {
  //   if (this.selectedFile) {
  //     // console.log(this.uploader.queue[0])
  //     // let file = this.uploader.queue[0]
  //     this.userService.uploadProfilePic(this.profilePhotoUpdateForm.value.file).subscribe((res) => {
  //       this.selectedFile = null;
  //       console.log(res);
  //     });
  //   }
  // }

  updateUserInfos() {
    let obj = {
      name: !this.nameUpadeForm.get("name").value
        ? null
        : this.nameUpadeForm.get("name").value,
      email: !this.emailUpadeForm.get("email").value
        ? null
        : this.emailUpadeForm.get("email").value,
      mobile: !this.mobileUpadeForm.get("mobile").value
        ? null
        : this.mobileUpadeForm.get("mobile").value,
      address: !this.addressUpadeForm.get("address").value
        ? null
        : this.addressUpadeForm.get("address").value,
    };
    console.log(obj);
    this.userService.updateUserInfo(obj).subscribe(
      (res: any) => {
        console.log(res);
        this.getProfileDetails();
        this.userService.refreshUserInfo(res);
        this.resetAllForms();
        $("#profileEdit").modal("hide");
      },
      (e: any) => {
        console.log(e);
        this.resetAllForms();
        $("#profileEdit").modal("hide");
      }
    );
  }

  resetAllForms() {
    this.passwordUpadeForm.reset();
    this.nameUpadeForm.reset();
    this.mobileUpadeForm.reset();
    this.emailUpadeForm.reset();
    this.addressUpadeForm.reset();
    this.profilePhotoUpdateForm.reset();
  }
}
