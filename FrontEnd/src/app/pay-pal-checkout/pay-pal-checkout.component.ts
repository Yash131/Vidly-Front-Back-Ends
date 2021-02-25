import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { CartService } from "../services/cart.service";
import { OrderService } from "../services/order.service";
declare var paypal;

@Component({
  selector: "app-pay-pal-checkout",
  templateUrl: "./pay-pal-checkout.component.html",
  styleUrls: ["./pay-pal-checkout.component.css"],
})
export class PayPalCheckoutComponent implements OnInit {
  @ViewChild("paypalRef", { static: true }) private paypalRefEl: ElementRef;

  @Input("cartDetails") cartDetails;
  @Input("shippingDetails") shippingDetails;
  @Input("userDetails") userDetails;

  paymentStatus = false;
  paypalData;
  isLoadig = false;

  constructor(
    private auth: AuthService,
    private orderSer: OrderService,
    private cartService: CartService,
    private router : Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initPayPal();
  }

  initPayPal() {
    const self = this;
    paypal
      .Buttons({
        style: {
          layout: "horizontal",
          color: "blue",
          shape: "rect",
          label: "paypal",
        },

        createOrder: (data, actions) => {
          self.isLoadig = true;
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: this.cartDetails?.totalPrice,
                  currency_code: "USD",
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          try {
            let paypal = await actions.order.capture();
            self.payloadGenerate(paypal);
          } catch (error) {
            console.error(error);
          }
          return;
        },
        onError: (error) => {
          self.isLoadig = false;
          self._snackBar.open(`Please try again something went wrong!`, "Failed", {
            duration: 3000,
          });
          console.error(error);
        },
      })
      .render(this.paypalRefEl.nativeElement);
  }

  payloadGenerate(data) {
    let obj = {
      shippingDetails: this.shippingDetails,
      products: this.cartDetails?.products,
      userDetails: this.userDetails,
      paymentModeData: data,
      totalPrice: this.cartDetails?.totalPrice,
      paymentMode: "PayPal",
      paymentStaus: data?.status,
      orderStatus: "Placed",
    };

    this.orderSer.orderSuccess(obj).subscribe(
      async (res: any) => {
        console.log(res);
        try{
          this.cartService.emptyWholeCart().subscribe((res:any) => {
            this.cartService.sendCartData(res?.data)
          },(err) => {
            this.isLoadig = false;
            console.error(err);

          })
          this._snackBar.open(`Order Placed Successfully`, "Success", {
            duration: 3000,
          });
          this.router.navigate(['order-success'])
        }catch(e){
          console.error(e)
        }
      },
      (err: any) => {
        console.error(err);
      }
    );
  }
}
