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

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "movies", component: MoviesComponent },
  { path: "aboutUs", component: AboutUsComponent },
  { path: "contactUs", component: ContactUsComponent },
  { path: "cart", component: ShoppingCartComponent , canActivate : [AuthGuard]},
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
