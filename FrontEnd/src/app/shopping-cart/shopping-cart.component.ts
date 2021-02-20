import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  movieArr : any[] = [];
  cart: any;
  constructor(private cartService : CartService) { }

  ngOnInit(): void {
    this.getCart();
  }

  getCart(){
    this.cartService.itemsOfCart().subscribe( (response:any) => {
      console.log(response);
      this.cartService.sendCartData(response)
      this.cart = response
      this.movieArr = response?.products
      console.log(this.movieArr)
    },(err) => {
      console.log(err);
    })
  }
  clearCart(){
    try {
      this.cartService.emptyWholeCart().subscribe( (res:any)=>{
        this.cartService.sendCartData(res.data)
        this.getCart();
      },(err)=>{
        console.log(err);
      } )
    } catch (err) {
      console.log(err);

    }
  }

  remMovie(movie){
    // console.log(movie)
    this.cartService.removeAmovieFromCart(movie._id).subscribe( (res:any) =>{
      // console.log(res)
      this.cartService.sendCartData(res.data)
      this.getCart();
    }, (err)=>{
      console.log(err)
    } )
  }
}
