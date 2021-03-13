import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { MoviesService } from "src/app/services/movies.service";
declare var $: any;

@Component({
  selector: "app-control-upcoming-movies",
  templateUrl: "./control-upcoming-movies.component.html",
  styleUrls: ["./control-upcoming-movies.component.scss"],
})
export class ControlUpcomingMoviesComponent implements OnInit {
  upcomingMovies: [] = [];
  isLoading: boolean = false;
  upcomingMovieForm: FormGroup;
  constructor(
    private movieService: MoviesService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getAllUpcomingMovies();
    this.initiateForm();
  }

  getAllUpcomingMovies() {
    this.isLoading = true;
    this.movieService.getUpcomingMovies().subscribe(
      (res: any) => {
        this.upcomingMovies = res;
        this.isLoading = false;
      },
      (err: any) => {
        this.isLoading = false;
      }
    );
  }
  trailerPopUp(url) {
    let popUpWindow = window.open(
      url,
      "popUpWindow",
      "height=400,width=600,left=50%,top=50%,resizable=yes,scrollbars=yes,"
    );
  }

  initiateForm() {
    this.upcomingMovieForm = this.fb.group({
      title: ["", [Validators.required]],
      trailerURL: ["", [Validators.required]],
      posterURL: ["", [Validators.required]],
      releaseDate: ["", [Validators.required]],
    });
  }

  addUpcomingMovie() {
    this.isLoading = true;
    if (this.upcomingMovieForm.value) {
      this.movieService
        .addUpcomingMovies(this.upcomingMovieForm.value)
        .subscribe(
          (res: any) => {
            console.log(res);
            this.getAllUpcomingMovies();
            $("#addUpcomingMovie").modal("hide");
            this.snackBar.open(res.message, "Success",{
              duration : 5000
            })
          },
          (e: any) => {
            this.isLoading = false;
            $("#addUpcomingMovie").modal("hide");
            this.snackBar.open(e, "Failed",{
              duration : 5000
            })
          }
        );
    }else{
      this.isLoading = false;
    }
  }

  deleteMovie(movie){
    this.isLoading = true;
    if(movie?._id){
      this.movieService.deleteUpcomingMovies(movie?._id).subscribe( (res:any) =>{
        this.getAllUpcomingMovies();
        this.snackBar.open(res.message, "Success",{
          duration : 5000
        })
      },(err:any)=> {
        this.snackBar.open(err, "Failed",{
          duration : 5000
        })
      })

    }else{
      this.isLoading = false;
    }
  }

  resetForm() {
    this.upcomingMovieForm.reset();
  }
}
