import { Component, OnInit } from '@angular/core';
import $ from 'jquery'
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  constructor() {
    $(window).ready(function () {
      $('input').attr('autocomplete', 'off');
    });
  }

  ngOnInit() {
  }

}
