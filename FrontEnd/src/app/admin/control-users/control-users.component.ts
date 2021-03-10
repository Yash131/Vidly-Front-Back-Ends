import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-control-users",
  templateUrl: "./control-users.component.html",
  styleUrls: ["./control-users.component.scss"],
})
export class ControlUsersComponent implements OnInit {
  users: [] = [];
  filteredusers = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService
      .getAllusers()
      .subscribe((res: any) => (this.filteredusers = this.users = res.data));
  }

  filter(search: string) {
    this.filteredusers = search
      ? this.users.filter((p: any) =>
          p?.email?.toLocaleLowerCase()?.includes(search.toLocaleLowerCase())
        )
      : this.users;
  }
}
