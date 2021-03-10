import { Component, OnInit } from "@angular/core";
import { GenresService } from "src/app/services/genres.service";
import { Genres } from "src/app/models/genres";
import { MatSnackBar } from "@angular/material/snack-bar";
import { remove } from "lodash";
import { Router } from "@angular/router";

@Component({
  selector: "app-genre-listing",
  templateUrl: "./genre-listing.component.html",
  styleUrls: ["./genre-listing.component.css"],
})
export class GenreListingComponent implements OnInit {
  dataSource: Genres[] = [];
  filteredGenre: any[] = [];

  constructor(
    private genreService: GenresService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.getGenres();
  }
  getGenres() {
    this.genreService.getGenres().subscribe(
      (data) => (this.filteredGenre = this.dataSource = data),
      (err) => {
        // console.error(err);
      }
    );
  }

  delBtnHandler(id) {
    this.genreService.deleteGenre(id).subscribe(
      (data) => {
        remove(this.dataSource, (item) => {
          return item._id === data._id;
        });
        this.dataSource = [...this.dataSource];
        this._snackBar.open("Deleted Successfully", "Success", {
          duration: 3000,
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
    this.router.navigateByUrl(`/genres/form/${id}`);
  }

  filter(search: string) {
    this.filteredGenre = search
      ? this.dataSource.filter((p) =>
          p.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
      : this.dataSource;
  }
}
