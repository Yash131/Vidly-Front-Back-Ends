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

  any = {
    _id : "any",
    name : "Any",
    selected : true
  }
  public selectedGenre = this.any._id


  constructor(private genreService: GenresService) {}

  ngOnInit() {
    this.genres.push(this.any)
    this.genreService.getGenres().subscribe(
      (data) => {
        this.genres = data;
        this.genres.unshift(this.any)
      },
      (err) => {
        console.log(err);
      }
    );
    this.genreService.sendGenreData("any");
  }
  genreChange(e){
    if(!e){
      this.genreService.sendGenreData("any");
    }
    this.genreService.sendGenreData(e._id);
  }

}
