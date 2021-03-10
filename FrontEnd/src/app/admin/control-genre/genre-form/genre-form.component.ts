import { Component, OnInit } from "@angular/core";
import { GenresService } from "src/app/services/genres.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router, ActivatedRoute } from "@angular/router";
import { Genres } from "src/app/models/genres";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

@Component({
  selector: "genre-form",
  templateUrl: "./genre-form.component.html",
  styleUrls: ["./genre-form.component.css"],
})
export class GenreFormComponent implements OnInit {
  genreForm: FormGroup;
  private genre: Genres;

  constructor(
    private genreService: GenresService,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initForm();
    this.setGenreToForm();
  }
  createGenre() {
    if (this.genre) {
      // update Genre
      this.genreService.updateGenre(this.genre._id, this.genreForm.value).subscribe(
        (data) => {
          this._snackBar.open("Updated Successfully.", "Success", {
            duration: 3000,
          });
          this.router.navigateByUrl('/genres/listing')
        },
        (err) => {
          this._snackBar.open(`Error: ${err.error}`, "Failed!", {
            duration: 3000,
          });
        }
      );
    } else {
      // creates Genre
      this.genreService.postGenres(this.genreForm.value).subscribe(
        (data) => {
          // console.log(data);
          this._snackBar.open("Genre Created.", "Success", {
            duration: 3000,
          });
          this.router.navigateByUrl("/genres/listing");
        },
        (err) => {
          // console.error(err);
          this._snackBar.open(`Error: ${err.error}`, "Failed!", {
            duration: 3000,
          });
        }
      );
    }
  }

  initForm() {
    this.genreForm = this.fb.group({
      name: ["", Validators.required],
    });
  }
  resetBtnHandler(){
    this.genreForm.reset()
  }

  setGenreToForm() {
    this.route.params.subscribe((params) => {
      let id = params["id"];
      if (!id) {
        return;
      }
      this.genreService.getGenreByID(id).subscribe(
        (data) => {
          this.genre = data;
          this.genreForm.patchValue(this.genre);
        },
        (err) => {
          // console.error(err.error);
          this._snackBar.open(`Error: ${err.error}`, "Failed!", {
            duration: 3000,
          });
        }
      );
    });
  }
}
