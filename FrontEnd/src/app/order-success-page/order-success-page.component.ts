import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-success-page',
  templateUrl: './order-success-page.component.html',
  styleUrls: ['./order-success-page.component.css']
})
export class OrderSuccessPageComponent {
  private zone: NgZone


  constructor(private ngZone: NgZone, private router: Router) {}

  public navigate(commands: any[]): void {
      this.ngZone.run(() => this.router.navigate(commands)).then();
  }
}
