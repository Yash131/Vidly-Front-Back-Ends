import { Genres } from "./genres";

export class Movies {
  _id: string;
  title: string;
  genreId: Genres[];
  imageUrl: string;
  trailerUrl: string;
  summery: string;
  rating: number;
  price: number;
  numberInStock: number;
  dailyRentalRate: number;
  inCart:boolean
}
