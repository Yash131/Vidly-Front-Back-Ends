import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-control-upcoming-movies',
  templateUrl: './control-upcoming-movies.component.html',
  styleUrls: ['./control-upcoming-movies.component.scss']
})
export class ControlUpcomingMoviesComponent implements OnInit {
  upcomingMovies:[]=[]
  isLoading:boolean = false;
  constructor(private movieService : MoviesService, private snackBar : MatSnackBar) { }

  ngOnInit(): void {
    this.getAllUpcomingMovies()
  }

  getAllUpcomingMovies(){
    this.isLoading = true;
    this.movieService.getUpcomingMovies()
      .subscribe((res:any)=> {
        this.upcomingMovies = res
        this.isLoading = false;

      },(err:any)=>{
        this.isLoading = false;
      });

  }
  trailerPopUp(url) {
    let popUpWindow = window.open(
      url,
      "popUpWindow",
      "height=400,width=600,left=50%,top=50%,resizable=yes,scrollbars=yes,"
    );
  }
}
