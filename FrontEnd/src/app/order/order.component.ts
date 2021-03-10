import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { OrderService } from "../services/order.service";
import { UserService } from "../services/user.service";
declare var $: any;

@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.scss"],
})
export class OrderComponent implements OnInit {
  isLoadig: boolean = false;
  myOrders: any[] = [];
  panelOpenState;
  orderID: any = null;
  liveOrders: any[] = [];
  cancelledOrders: any[] = [];

  constructor(
    private orderService: OrderService,
    private _snackBar: MatSnackBar,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.panelOpenState = false;
    this.getMyOrders();
  }

  getMyOrders() {
    this.isLoadig = true;
    this.orderService.getMyOrders().subscribe(
      (res: any) => {
        this.myOrders = res.data;

        if(res?.data?.length){
          this.myOrders.filter((el: any) => {
            if (el.orderStatus == "Cancelled") {
              this.cancelledOrders.push(el);
            } else {
              this.liveOrders.push(el);
            }

            this.isLoadig = false;

          });
        }else{
          this.isLoadig = false;
          this._snackBar.open(res.message, "Info", {
            duration: 5000,
          });
        }

      },
      (err: any) => {
        this.isLoadig = false;
        // console.error(err);
        this._snackBar.open(err, "Failed", {
          duration: 5000,
        });
      }
    );
  }

  currOrder(order) {
    // console.log(order._id)
    this.orderID = order._id;
  }

  cancelOrder() {
    this.isLoadig = true;

    if (this.orderID) {
      this.orderService.cancelOrder({ orderID: this.orderID }).subscribe(
        (res: any) => {
          // this.myOrders = res.data
          // console.log(this.myOrders)
          $("#orderCancelModal").modal("hide");
          this.liveOrders = [];
          this.cancelledOrders = [];
          this.getMyOrders();
          this._snackBar.open(res.message, "Success", {
            duration: 3000,
          });
          this.orderID = null;
          this.isLoadig = false;
        },
        (err: any) => {
          // console.error(err);
          $("#orderCancelModal").modal("hide");
          this.orderID = null;
          this.isLoadig = false;
        }
      );
    }
  }
}
