import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { OrderService } from "src/app/services/order.service";
declare var $:any;
@Component({
  selector: "app-control-orders",
  templateUrl: "./control-orders.component.html",
  styleUrls: ["./control-orders.component.scss"],
})
export class ControlOrdersComponent implements OnInit {
  orders: any;
  panelOpenState: boolean = false;
  isLoading: boolean = false;
  orderData:any = null;
  orderStatus = [
    { status: "Placed", id: "Placed" },
    { status: "Cancelled", id: "Cancelled" },
    { status: "Shipped", id: "Shipped" },
    { status: "Completed", id: "Completed" },
  ];
  selectedStatus;
  constructor(private orderServie: OrderService, private snackBar : MatSnackBar) {}

  ngOnInit(): void {
    this.get_All_live_orders();
  }

  cancelOrder(order) {
    this.orderServie
      .cancel_order_by_id({ orderID: order?._id })
      .subscribe((res: any) => {
        console.log(res);
        this.get_All_live_orders();
        this.snackBar.open(res?.message, "Success",{
          duration : 5000
        })
      },(err: any) => {
        console.log(err);
        this.snackBar.open(err, "Failed",{
          duration : 5000
        })
      });
  }

  get_All_live_orders() {
    this.isLoading = true;
    this.orderServie.allLiveOrders().subscribe(
      (res: any) => {
        this.orders = res;
        this.isLoading = false;
      },
      (err: any) => {
        console.log(err);
        this.isLoading = false;
      }
    );
  }

  changeStatus(status){
    if(this.orderData){
      console.log(status)
      this.orderServie
      .changeOrderStatus({ orderID: this.orderData?._id, orderStatus : status })
      .subscribe((res: any) => {
        console.log(res);
        $("#changeStatus").modal("hide");
        this.get_All_live_orders();
        this.snackBar.open(res?.message, "Success",{
          duration : 5000
        })
        this.orderData = null;
      },(err: any) => {
        console.log(err);
        $("#changeStatus").modal("hide");
        this.snackBar.open(err, "Failed",{
          duration : 5000
        })
        this.orderData = null;
      });
    }
  }

  orderInfo(order){
    console.log(order)
    return this.orderData = order;
  }
}
