import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private BASE_URL: string = "http://localhost:3000/api/";

  private _orderSource = new Subject<any>();
  orderSource$ = this._orderSource.asObservable();

  private _paypalSource = new Subject<any>();
  paypalSource$ = this._paypalSource.asObservable();

  constructor(private http : HttpClient) { }

  sendCartDataToOrder(data){
    this._orderSource.next(data)
  }


  sendpaypalData(data){
    this._paypalSource.next(data)
  }

  orderSuccess(data){
   return this.http.post(`${this.BASE_URL}orders`, data)
  }

  getMyOrders(){
    return this.http.get(`${this.BASE_URL}orders/my-orders`)
  }

  cancelOrder(data){
    return this.http.post(`${this.BASE_URL}orders/cancel-order`, data)
  }

}
