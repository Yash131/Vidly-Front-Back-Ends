import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { MoviesService } from "../services/movies.service";
import { Movies } from "../models/movies";
import { CartService } from "../services/cart.service";
import { AuthService } from "../services/auth.service";
import { GenresComponent } from "../genres/genres.component";
import { GenresService } from "../services/genres.service";
declare var $: any;

@Component({
  selector: "movies",
  templateUrl: "./movies.component.html",
  styleUrls: ["./movies.component.scss"],
})
export class MoviesComponent implements OnInit, AfterViewInit, OnDestroy {

  movies: Movies[] = [];
  filteredMovies: any[] = [];
  moviesInCart: any[] = [];
  inCart: Boolean = false;
  isLoggedIn: boolean;
  selectedGenre;
  genreFilteredArr: any[] = [];
  isLoadig = false;
  constructor(
    private moviesService: MoviesService,
    private cartService: CartService,
    private authService: AuthService,
    private genreService : GenresService
  ) {}

  ngOnInit() {
    this.cartData();
    this.getMovies();
    this.isLoggedIn = this.authService.isLoggedIn();
    // console.log(this.isLoggedIn)
  }

  ngAfterViewInit() {
    setTimeout(() => {
    this.selectedGenre = this.genreService.genreSource$
    .subscribe( (res:any) => {
      // console.log(res)
      this.selectedGenre = res
      // this.selectedGenre = (!this.selectedGenre) ? "any" : this.selectedGenre
      this.getMovies()
    } )
    }, 100);
    // console.log(this.selectedGenre)

    // this.selectedGenre = this.genreComponent.message;
  }

  ngOnDestroy() {}

  trailerPopUp(url) {
    let popUpWindow = window.open(
      url,
      "popUpWindow",
      "height=400,width=600,left=50%,top=50%,resizable=yes,scrollbars=yes,"
    );
  }

  addToCart(movie) {
      console.log(movie);
      let obj = {
        movieID: movie._id,
        image : movie.imageUrl,
        quantity: 1,
        title: movie.title,
        price: movie.price,
      };
      try {
        this.cartService.addToCart(obj).subscribe(
          (res: any) => {
            // console.log(res)
            this.moviesInCart = res?.products;
            this.cartService.sendCartData(res);
            this.getMovies();
            // this.updateMovieArr(this.movies, this.moviesInCart, true);
          },
          (err) => {
            console.log(err);
          }
        );
      } catch (e) {
        // console.error(e);
      }
  }

  removeFromCart(movie) {
    // console.log(movie);
    // console.log(movie._id);
      this.cartService.removeAmovieFromCart(movie.movieID).subscribe(
        (res: any) => {
          // console.log(res);
          this.cartService.sendCartData(res.data);
          this.cartData();
          this.getMovies();
        },
        (err) => {
          // console.error(err);
        }
      );
  }

  getMovies() {
    this.isLoadig = true;
    this.moviesService.getMovies(this.selectedGenre).subscribe(
      (data) => {
        this.filteredMovies = this.movies = data;
        // console.log(this.movies)
        // this.updateMovieArr(this.movies, this.moviesInCart, true);
        setTimeout(() => {
          // console.log(this.movies,this.moviesInCart)
          this.updateMovieArr(this.movies, this.moviesInCart, true);
          // console.log(this.movies);

          this.isLoadig = false;

        }, 50);
      },
      (err) => {
        // console.error(err);
        this.isLoadig = false;

      }
    );
  }

  cartData() {
    // if(this.isLoggedIn){
      this.cartService.itemsOfCart().subscribe(
        (res: any) => {
          this.moviesInCart = res?.products;
          // this.updateMovieArr(this.movies, this.moviesInCart, true);
        },
        (err) => {
          console.error(err.message);
        }
      );
    // }
  }

  updateMovieArr(movieArr: Array<any>, movieArrInCart: Array<any>, inCart) {
    // updating movie arr with movies in cart
    // console.log("movieArr updatation works");

    if (movieArr?.length && movieArrInCart?.length) {
      movieArr = movieArr.filter((el_movieArr, index1) => {
        movieArrInCart.filter((el_movieInCart, index2) => {
          if (el_movieArr._id == el_movieInCart.movieID) {
            movieArr[index1].inCart = inCart;
            movieArr[index1].movieID = el_movieInCart._id;
            // console.log(el_movieArr, index1)
          }
          // else{
          //   movieArr[index1].inCart = false;
          // }
        });
      });
      // }else{
      //   this.inCart = null;
      // }
    }
  }


  filter(search: string) {
    this.filteredMovies = search
      ? this.movies.filter((p) =>
          p.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
      : this.movies;
  }
}
