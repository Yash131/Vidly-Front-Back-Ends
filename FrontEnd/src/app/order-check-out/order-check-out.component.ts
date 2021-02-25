import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { CartService } from "../services/cart.service";

@Component({
  selector: "app-order-check-out",
  templateUrl: "./order-check-out.component.html",
  styleUrls: ["./order-check-out.component.css"],
})
export class OrderCheckOutComponent implements OnInit {
  cart;
  shippingForm;
  enableShipping: boolean = true;
  enableCheckout: boolean = false;

  cartDetails
  shippingDetails;
  userDetails;

  constructor(
    private cartService: CartService,
    private fb: FormBuilder,
    private router: Router,
    private auth : AuthService
  ) {}

  ngOnInit(): void {
    this.getCartDetails()
    this.getUserInfo()
    this.initForm();
  }

  initForm() {
    this.shippingForm = this.fb.group({
      name: ["", Validators.required],
      email: ["", Validators.required],
      mobile: ["", Validators.required],
      addressLine1: ["", Validators.required],
      addressLine2: ["", Validators.required],
      city: ["", Validators.required],
    });
  }

  resetBtn() {
    this.shippingForm.reset();
  }

  submitForm() {
    // console.log(this.shippingForm.value);
    this.enableShipping = false;
    this.enableCheckout = true;
    // this.totalPrice = this.cart?.totalPrice;
    this.cartDetails = this.cart
    this.shippingDetails = this.shippingForm.value;
  }

  getCartDetails(){
    this.cartService.itemsOfCart().subscribe( (res:any)=>{
      this.cart = res;
    },(err:any)=>{
      console.error(err);
    } )
  }

  getUserInfo(){
    this.auth.getCurrentUser().subscribe( (res) => {
      this.userDetails = res;
      // console.log(this.userDetails)

    },
    (err:any)=>{
      console.error(err);
    }  )
  }

}
