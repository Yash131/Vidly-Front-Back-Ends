import { Component, OnInit } from "@angular/core";
import { ContactUsService } from "src/app/services/contact-us.service";
import { ContactUs } from "src/app/models/contactUs";
import { MatSnackBar } from "@angular/material/snack-bar";
import { remove } from "lodash";

@Component({
  selector: "app-control-messages",
  templateUrl: "./control-messages.component.html",
  styleUrls: ["./control-messages.component.scss"],
})
export class ControlMessagesComponent implements OnInit {
  contact: ContactUs[] = [];
  filteredContact: any[] = [];

  constructor(
    private contactUsService: ContactUsService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getMessages();
  }

  getMessages() {
    this.contactUsService.getContacts().subscribe(
      (data) => {
        // console.log(this.filteredContact);

        this.filteredContact = this.contact = data;
      },
      (err) => {
        // console.error(err.error);
      }
    );
  }

  delBtnHandler(id) {
    this.contactUsService.deleteContact(id).subscribe(
      (data) => {
        remove(this.contact, (item) => {
          return item._id === data._id;
        });
        this.contact = [...this.contact];
        this._snackBar.open("Deleted Successfully", "Success", {
          duration: 3000,
        });
      },
      (err) => {
        // console.error(err);
        this._snackBar.open(`${err.error}`, "Failed!", {
          duration: 3000,
        });
      }
    );
  }

  filter(search: string) {
    this.filteredContact = search
      ? this.contact.filter((p) =>
          p.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
      : this.contact;
  }
}
