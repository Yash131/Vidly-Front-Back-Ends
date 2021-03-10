import { Component, OnInit } from "@angular/core";
import { MoviesService } from "../services/movies.service";
declare var $: any;

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  photo: string;
  upComminMovies: any[]=[];
  constructor( private moviesService : MoviesService) {
  }

  ngOnInit() {
    this.photo = `url(../../assets/img/blackWidow.jfif)`
    this.getUpcominMovie()
  }



  getUpcominMovie(){
    this.moviesService.getUpcomingMovies().subscribe( (res:any) => {
      this.upComminMovies = res
      // console.log(res)
    },(err) =>{
      console.log(err)
    } )
  }

  trailerPopUp(url) {
    let popUpWindow = window.open(
      url,
      "popUpWindow",
      "height=400,width=600,left=50%,top=50%,resizable=yes,scrollbars=yes,"
    );
  }
}
