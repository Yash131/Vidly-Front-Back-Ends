import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

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
   return this.http.post(`${environment.api_url}orders`, data)
  }

  getMyOrders(){
    return this.http.get(`${environment.api_url}orders/my-orders`)
  }

  cancelOrder(data){
    return this.http.post(`${environment.api_url}orders/cancel-order`, data)
  }

  orderCounter(){
    return this.http.get(`${environment.api_url}orders/order_counter`)
  }

}
