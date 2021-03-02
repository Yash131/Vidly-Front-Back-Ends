import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderService } from '../services/order.service';
declare var $:any;

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  isLoadig:boolean;
  myOrders: any[] = []
  panelOpenState;
  orderID: any = null;
  liveOrders: any[] = [];
  cancelledOrders: any[] = [];

  constructor(private orderService : OrderService, private _snackBar : MatSnackBar) { }

  ngOnInit(): void {
    this.isLoadig = false
    this.panelOpenState = false;
    this.getMyOrders()
  }


  getMyOrders(){
    this.orderService.getMyOrders().subscribe( (res:any) => {
      this.myOrders = res.data

      this.myOrders.filter( (el:any) => {
        if(el.orderStatus == 'Cancelled'){
          this.cancelledOrders.push(el)
        }else{
          this.liveOrders.push(el)
        }

        // console.log(this.cancelledOrders)
        // console.log(this.liveOrders)
      })

    },(err:any) => {
      console.error(err)
    })
  }

  currOrder(order){
    // console.log(order._id)
    this.orderID = order._id
  }

  cancelOrder(){
    if(this.orderID){
    this.orderService.cancelOrder({orderID : this.orderID}).subscribe((res:any) => {
      // this.myOrders = res.data
      // console.log(this.myOrders)
      $('#orderCancelModal').modal('hide')
      this.liveOrders = []
      this.cancelledOrders = []
      this.getMyOrders()
      this._snackBar.open(res.message, "Success", {
        duration: 3000,
      });
      this.orderID = null;

    },(err:any) => {
      console.error(err)
      $('#orderCancelModal').modal('hide')
      this.orderID = null;

    })

    }
  }
}
