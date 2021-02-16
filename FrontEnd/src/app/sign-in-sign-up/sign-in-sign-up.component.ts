import { Component, OnInit } from '@angular/core';
import $ from 'jquery';

@Component({
  selector: 'app-sign-in-sign-up',
  templateUrl: './sign-in-sign-up.component.html',
  styleUrls: ['./sign-in-sign-up.component.css']
})
export class SignInSignUpComponent implements OnInit {

  constructor() { 
    // $(window).ready(function () {
    //   $('input').attr('autocomplete', 'off');
    //   $('form').attr('autocomplete', 'off');
    // });
  }

  ngOnInit() {
  }

}
