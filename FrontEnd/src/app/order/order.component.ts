import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  isLoadig:boolean;
  myOrders: any[] = []
  panelOpenState;

  constructor(private orderService : OrderService, private _snackBar : MatSnackBar) { }

  ngOnInit(): void {
    this.isLoadig = false
    this.panelOpenState = false;
    this.getMyOrders()
  }


  getMyOrders(){
    this.orderService.getMyOrders().subscribe( (res:any) => {
      this.myOrders = res.data
      console.log(this.myOrders)

      this._snackBar.open(res.message, "Success", {
        duration: 3000,
      });
    },(err:any) => {
      console.error(err)
    })
  }

}
