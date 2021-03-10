import { Component, OnInit } from "@angular/core";
import { MoviesService } from "src/app/services/movies.service";
import { Movies } from "src/app/models/movies";
import { MatSnackBar } from "@angular/material/snack-bar";
import { remove } from "lodash";
import { Router } from "@angular/router";

@Component({
  selector: "app-movie-listing",
  templateUrl: "./movie-listing.component.html",
  styleUrls: ["./movie-listing.component.css"],
})
export class MovieListingComponent implements OnInit {
  movies: Movies[] = [];

  constructor(
    private movieService: MoviesService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllMovies();
  }

  getAllMovies() {
    this.movieService.getMovies("any").subscribe(
      (data) => {
        // console.log(data);
        this.movies = data;
      },
      (err) => {
        // console.error(err.error);
      }
    );
  }

  delBtnHandler(id) {
    this.movieService.deleteMovie(id).subscribe(
      (data) => {
        remove(this.movies, (item) => {
          return item._id === data._id;
        });
        this.movies = [...this.movies];
        this._snackBar.open("Deleted Successfully", "Success", {
          duration: 2000,
        });
      },
      (err) => {
        // console.error(err);
        this._snackBar.open(`${err.error}`, "Failed!", {
          duration: 3000,
        });
      }
    );
  }

  editBtnHandler(id) {
    this.router.navigateByUrl(`movies/form/${id}`);
  }

  trailerPopUp(url) {
    let popUpWindow = window.open(
      url,
      "popUpWindow",
      "height=400,width=600,left=50%,top=50%,resizable=yes,scrollbars=yes,"
    );
  }
}
