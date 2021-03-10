import { Component, OnInit } from "@angular/core";
import { GenresService } from "src/app/services/genres.service";
import { Genres } from "src/app/models/genres";
import { MoviesService } from "src/app/services/movies.service";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router, ActivatedRoute } from "@angular/router";
import { Movies } from "src/app/models/movies";

@Component({
  selector: "app-movie-form",
  templateUrl: "./movie-form.component.html",
  styleUrls: ["./movie-form.component.css"],
})
export class MovieFormComponent implements OnInit {
  genres: Genres[] = [];
  movieForm: FormGroup;
  movie: Movies;

  constructor(
    private genreService: GenresService,
    private movieService: MoviesService,
    // private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getGenre();
    this.initForm();
    this.setMovieToForm();
    this.resetBtn();
  }

  getGenre() {
    this.genreService.getGenres().subscribe(
      (data) => {
        this.genres = data;
        // console.log(data);
      },
      (err) => {
        // console.log(err);
      }
    );
  }

  initForm() {
    this.movieForm = new FormGroup({
      title: new FormControl(""),
      genreId: new FormControl(""),
      imageUrl: new FormControl(""),
      trailerUrl: new FormControl(""),
      summery: new FormControl(""),
      rating: new FormControl(""),
      price: new FormControl(""),
      numberInStock: new FormControl(""),
      dailyRentalRate: new FormControl(""),
    });
  }

  submitMovie() {
    if (this.movie) {
      this.movieService
        .updateMovie(this.movie._id, this.movieForm.value)
        .subscribe(
          (data) => {
            this._snackBar.open("Updated Successfully.", "Success", {
              duration: 3000,
            });
            this.router.navigateByUrl("/movies/listing");
          },
          (err) => {
            this._snackBar.open(`Error: ${err.error}`, "Failed!", {
              duration: 3000,
            });
          }
        );
    } else {
      this.movieService.postMovie(this.movieForm.value).subscribe(
        (data) => {
          // console.log(this.movieForm.value);
          this.router.navigateByUrl('/movies/listing')
          this._snackBar.open(`Movie Submitted`, "Success", {
            duration: 3000,
          });
        },
        (err) => {
          // console.log(this.movieForm.value);

          // console.error(err.error);
          this._snackBar.open(`Error: ${err.error}`, "Failed!", {
            duration: 3000,
          });
        }
      );
    }
  }

  resetBtn() {
    this.movieForm.reset();
  }

  setMovieToForm() {
    this.route.params.subscribe((param) => {
      let id = param["id"];
      if (!id) {
        return;
      } else {
        this.movieService.getAMovie(id).subscribe(
          (data) => {
            this.movie = data;
            this.movieForm.patchValue(this.movie);
          },
          (err) => {
            // console.error(err.error);
            this._snackBar.open(`Error: ${err.error}`, "Failed!", {
              duration: 3000,
            });
          }
        );
      }
    });
  }

  cancelBtn() {
    this.resetBtn();
    this.router.navigateByUrl("/movies/listing");
  }
}
