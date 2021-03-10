import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MoviesComponent } from "./movies/movies.component";
import { HomeComponent } from "./home/home.component";
import { AboutUsComponent } from "./about-us/about-us.component";
import { ContactUsComponent } from "./contact-us/contact-us.component";
import { SignInComponent } from "./sign-in-sign-up/sign-in/sign-in.component";
import { AdminPanelComponent } from "./admin/admin-panel/admin-panel.component";
import { GenreListingComponent } from "./admin/control-genre/genre-listing/genre-listing.component";
import { GenreFormComponent } from "./admin/control-genre/genre-form/genre-form.component";
import { ControlMessagesComponent } from "./admin/control-messages/control-messages.component";
import { MovieListingComponent } from "./admin/control-movies/movie-listing/movie-listing.component";
import { MovieFormComponent } from "./admin/control-movies/movie-form/movie-form.component";
import { AuthGuard } from "./auth/auth.guard";
import { AdminAuthGuard } from "./auth/admin-auth.guard";
import { SignUpComponent } from "./sign-in-sign-up/sign-up/sign-up.component";
import { SignInSignUpComponent } from "./sign-in-sign-up/sign-in-sign-up.component";
import { ShoppingCartComponent } from "./shopping-cart/shopping-cart.component";
import { OrderComponent } from "./order/order.component";
import { OrderCheckOutComponent } from "./order-check-out/order-check-out.component";
import { OrderSuccessPageComponent } from "./order-success-page/order-success-page.component";
import { MyProfileComponent } from "./my-profile/my-profile.component";
import { AccountActivateComponent } from "./account-activate/account-activate.component";
import { ForgotPassComponent } from "./forgot-pass/forgot-pass.component";
import { ControlUsersComponent } from "./admin/control-users/control-users.component";
import { ControlUpcomingMoviesComponent } from "./admin/control-upcoming-movies/control-upcoming-movies.component";
import { ControlOrdersComponent } from "./admin/control-orders/control-orders.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "movies", component: MoviesComponent },
  { path: "aboutUs", component: AboutUsComponent },
  { path: "contactUs", component: ContactUsComponent },
  { path: "account-activation", component: AccountActivateComponent },
  { path: "forgot-password", component: ForgotPassComponent },
  { path: "cart", component: ShoppingCartComponent, canActivate: [AuthGuard] },
  {
    path: "my-profile",
    component: MyProfileComponent,
    canActivate: [AuthGuard],
  },
  { path: "my-orders", component: OrderComponent, canActivate: [AuthGuard] },
  {
    path: "check-out",
    component: OrderCheckOutComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "order-success",
    component: OrderSuccessPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "user",
    component: SignInSignUpComponent,
    children: [{ path: "signUp", component: SignUpComponent }],
  },
  {
    path: "user",
    component: SignInSignUpComponent,
    children: [{ path: "signIn", component: SignInComponent }],
  },
  {
    path: "adminPanel",
    component: AdminPanelComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
  },
  {
    path: "genres/listing",
    component: GenreListingComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
  },
  {
    path: "genres/form/new",
    component: GenreFormComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
  },
  {
    path: "genres/form/:id",
    component: GenreFormComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
  },
  {
    path: "movies/listing",
    component: MovieListingComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
  },
  {
    path: "movies/form/new",
    component: MovieFormComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
  },
  {
    path: "movies/form/:id",
    component: MovieFormComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
  },
  {
    path: "messages",
    component: ControlMessagesComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
  },
  {
    path: "vidly_users",
    component: ControlUsersComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
  },
  {
    path: "upcoming_movies",
    component: ControlUpcomingMoviesComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
  },
  {
    path: "all_orders",
    component: ControlOrdersComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
  },
  { path: "**", component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
