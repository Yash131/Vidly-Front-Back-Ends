import { Component, OnInit } from "@angular/core";
import { GenresService } from "../services/genres.service";
import { Genres } from "../models/genres";

@Component({
  selector: "genres",
  templateUrl: "./genres.component.html",
  styleUrls: ["./genres.component.css"],
})
export class GenresComponent implements OnInit {
  genres: Genres[] = [];
  selectedGenre:any;
  constructor(private genreService: GenresService) {}

  ngOnInit() {
    this.genreService.getGenres().subscribe(
      (data) => {
        this.genres = data;
        // console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
