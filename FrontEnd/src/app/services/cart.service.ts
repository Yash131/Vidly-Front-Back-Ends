import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Cart_Modal } from '../models/cart';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private BASE_URL: string = "http://localhost:3000/api/";

  private _cartSource = new Subject<any>();
  cartSource$ = this._cartSource.asObservable();


  constructor( private http : HttpClient) { }

  addToCart(body: Cart_Modal): Observable<Cart_Modal> {
    return this.http.post<Cart_Modal>(`${this.BASE_URL}userCart`, body);
  }

  itemsOfCart(){
    return this.http.get(`${this.BASE_URL}userCart`)
  }

  totalItemInCart(){
    return this.http.get(`${this.BASE_URL}userCart/totalItems`)
  }

  emptyWholeCart(){
    return this.http.delete(`${this.BASE_URL}userCart/emptyCart`)
  }

  removeAmovieFromCart(id){
    return this.http.delete(`${this.BASE_URL}userCart/removeAMovie/${id}`)
  }

  sendCartData(data){
    this._cartSource.next(data)
  }

}
