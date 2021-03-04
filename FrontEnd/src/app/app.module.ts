import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MoviesComponent } from "./movies/movies.component";
import { GenresComponent } from "./genres/genres.component";
import { GenresService } from "./services/genres.service";
import { MoviesService } from "./services/movies.service";
import { HomeComponent } from "./home/home.component";
import { AboutUsComponent } from "./about-us/about-us.component";
import { ContactUsComponent } from "./contact-us/contact-us.component";
import { SignInComponent } from "./sign-in-sign-up/sign-in/sign-in.component";
import { AdminPanelComponent } from "./admin/admin-panel/admin-panel.component";
import { GenreListingComponent } from "./admin/control-genre/genre-listing/genre-listing.component";
import { ControlMoviesComponent } from "./admin/control-movies/control-movies.component";
import { ControlRentalsComponent } from "./admin/control-rentals/control-rentals.component";
import { ControlCustomerComponent } from "./admin/control-customer/control-customer.component";
import { ControlUsersComponent } from "./admin/control-users/control-users.component";
import { ControlMessagesComponent } from "./admin/control-messages/control-messages.component";
import { AuthService } from "./services/auth.service";
import { JwtService } from "./services/jwt.service";
import { HttpInterceptorService } from "./services/http-interceptor.service";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { GenreFormComponent } from "./admin/control-genre/genre-form/genre-form.component";
import { MovieFormComponent } from "./admin/control-movies/movie-form/movie-form.component";
import { MovieListingComponent } from "./admin/control-movies/movie-listing/movie-listing.component";
import { AuthGuard } from "./auth/auth.guard";
import { SignUpComponent } from "./sign-in-sign-up/sign-up/sign-up.component";
import { SignInSignUpComponent } from "./sign-in-sign-up/sign-in-sign-up.component";
import { UserService } from "./services/user.service";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from "ng-recaptcha";
// import { NgxWhastappButtonModule } from "ngx-whatsapp-button";
import { CookieService } from 'ngx-cookie-service';
import { NgSelectModule } from '@ng-select/ng-select';
import { HeadNavbarComponent } from './head-navbar/head-navbar.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginOrLogoutAlertModalComponent } from './popups/login-or-logout-alert-modal/login-or-logout-alert-modal.component';
import { OrderComponent } from './order/order.component';
import { OrderCheckOutComponent } from './order-check-out/order-check-out.component';
import { PayPalCheckoutComponent } from './pay-pal-checkout/pay-pal-checkout.component';
import { OrderSuccessPageComponent } from './order-success-page/order-success-page.component';
import { LoaderComponent } from './loader/loader.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { FileUploadModule } from "ng2-file-upload";
import { FooterComponent } from './footer/footer.component';
import { AccountActivateComponent } from './account-activate/account-activate.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    GenresComponent,
    HomeComponent,
    AboutUsComponent,
    ContactUsComponent,
    SignInComponent,
    AdminPanelComponent,
    GenreListingComponent,
    ControlMoviesComponent,
    ControlRentalsComponent,
    ControlCustomerComponent,
    ControlUsersComponent,
    ControlMessagesComponent,
    GenreFormComponent,
    MovieFormComponent,
    MovieListingComponent,
    SignUpComponent,
    SignInSignUpComponent,
    HeadNavbarComponent,
    ShoppingCartComponent,
    LoginOrLogoutAlertModalComponent,
    OrderComponent,
    OrderCheckOutComponent,
    PayPalCheckoutComponent,
    OrderSuccessPageComponent,
    LoaderComponent,
    MyProfileComponent,
    FooterComponent,
    AccountActivateComponent,
    ForgotPassComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatCardModule,
    MatButtonModule,
    RecaptchaV3Module,
    NgSelectModule,
    NgbModule,
    MatExpansionModule,
    FileUploadModule
    // NgxWhastappButtonModule
  ],
  providers: [
    GenresService,
    MoviesService,
    AuthService,
    JwtService,
    AuthGuard,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
    { provide: RECAPTCHA_V3_SITE_KEY, useValue: "6LchgTIaAAAAAFfYa3CzqjQ4_knFZNLLSlhxfF5B" },
    CookieService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
