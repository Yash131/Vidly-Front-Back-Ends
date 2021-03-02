import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-success-page',
  templateUrl: './order-success-page.component.html',
  styleUrls: ['./order-success-page.component.css']
})
export class OrderSuccessPageComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  navToOrders(){
    this.router.navigateByUrl('/my-orders')
  }
}
