import { Component, OnInit } from "@angular/core";
import { MoviesService } from "../services/movies.service";
import { Movies } from "../models/movies";

@Component({
  selector: "movies",
  templateUrl: "./movies.component.html",
  styleUrls: ["./movies.component.css"],
})
export class MoviesComponent implements OnInit {
  movies: Movies[] = [];
  constructor(private moviesService: MoviesService) {}

  ngOnInit() {
    this.moviesService.getMovies().subscribe(
      (data) => {
        this.movies = data;
        console.log(data);
      },
      (err) => {
        console.error(err);
      }
    );
  }

  trailerPopUp(url) {
    let popUpWindow = window.open(
      url,
      "popUpWindow","height=400,width=600,left=50%,top=50%,resizable=yes,scrollbars=yes,"
    );
  }
}
