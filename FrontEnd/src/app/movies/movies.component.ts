import { Component, OnInit } from "@angular/core";
import { MoviesService } from "../services/movies.service";
import { Movies } from "../models/movies";
import { CartService } from "../services/cart.service";
@Component({
  selector: "movies",
  templateUrl: "./movies.component.html",
  styleUrls: ["./movies.component.scss"],
})
export class MoviesComponent implements OnInit {
  movies: Movies[] = [];
  moviesInCart: any[] = [];
  inCart: Boolean = false;
  constructor(
    private moviesService: MoviesService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.getMovies();
    // this.cartData();
  }

  trailerPopUp(url) {
    let popUpWindow = window.open(
      url,
      "popUpWindow",
      "height=400,width=600,left=50%,top=50%,resizable=yes,scrollbars=yes,"
    );
  }

  addToCart(movie) {
    console.log(movie)
    let obj = {
      movieID: movie._id,
      quantity: 1,
      title: movie.title,
      price: movie.price,
    };
    try {
      this.cartService.addToCart(obj).subscribe(
        (res: any) => {
          // console.log(res)

          this.cartService.sendCartData(res)
          this.getMovies()
        },
        (err) => {
          console.log(err);
        }
      );
    } catch (e) {
      console.log(e);
    }
  }


  removeFromCart(movie){
    console.log(movie)
    console.log(movie._id)
    this.cartService.removeAmovieFromCart(movie._id).subscribe( (res:any) =>{
      console.log(res)
      this.cartService.sendCartData(res.data)
      this.cartData();
    }, (err)=>{
      console.log(err)
    })

  }

  getMovies() {
    this.moviesService.getMovies().subscribe(
      (data) => {
        this.movies = data;
        // console.log(this.movies)
      },
      (err) => {
        console.error(err);
      }
    );
  }

  cartData() {
    this.cartService.itemsOfCart().subscribe(
      (res: any) => {
        this.moviesInCart = res?.products;
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
