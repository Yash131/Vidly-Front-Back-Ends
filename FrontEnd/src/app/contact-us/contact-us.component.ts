import { Component, OnInit } from "@angular/core";
import { ContactUsService } from "../services/contact-us.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';
import $ from 'jquery'

@Component({
  selector: "app-contact-us",
  templateUrl: "./contact-us.component.html",
  styleUrls: ["./contact-us.component.scss"],
})
export class ContactUsComponent implements OnInit {
  contactUsForm: FormGroup;
  constructor(
    private contactUsService: ContactUsService,
    private fb: FormBuilder,
    private _snackBar : MatSnackBar
  ) {
    $(window).ready(function () {
      $('input').attr('autocomplete', 'off');
    });
  }
  ngOnInit() {
    this.initForm();
    this.resetBtn();
  }

  initForm() {
    this.contactUsForm = this.fb.group({
      name: ["", Validators.required],
      email: ["", Validators.required],
      message: ["", Validators.required],
    });
  }

  resetBtn() {
    this.contactUsForm.reset();
  }

  submitContact() {
    this.contactUsService.postContacts(this.contactUsForm.value).subscribe(
      (data) => {
        console.log(data);

        this._snackBar.open("Message Sent.", "Success", {
          duration: 3000,
        });
        this.resetBtn()
      },
      (err) => {
        console.error(err);

        this._snackBar.open( `Error: ${err.error}`, "Failed", {
          duration: 3000,
        });
      }
    );
  }
}
