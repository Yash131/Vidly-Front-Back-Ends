import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Cart_Modal } from '../models/cart';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private BASE_URL: string = "http://localhost:3000/api/";

  private _cartSource = new Subject<any>();
  cartSource$ = this._cartSource.asObservable();


  constructor( private http : HttpClient) { }

  addToCart(body: Cart_Modal): Observable<Cart_Modal> {
    return this.http.post<Cart_Modal>(`${environment.api_url}userCart`, body);
  }

  itemsOfCart(){
    return this.http.get(`${environment.api_url}userCart`)
  }

  totalItemInCart(){
    return this.http.get(`${environment.api_url}userCart/totalItems`)
  }

  emptyWholeCart(){
    return this.http.delete(`${environment.api_url}userCart/emptyCart`)
  }

  removeAmovieFromCart(id){
    return this.http.delete(`${environment.api_url}userCart/removeAMovie/${id}`)
  }

  sendCartData(data){
    this._cartSource.next(data)
  }

}
