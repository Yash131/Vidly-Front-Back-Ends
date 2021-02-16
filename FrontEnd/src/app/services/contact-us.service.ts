import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ContactUs } from "../models/contactUs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ContactUsService {
  constructor(private httpClient: HttpClient) {}

  getContacts(): Observable<ContactUs[]> {
    return this.httpClient.get<ContactUs[]>(`${environment.api_url}contactUs`);
  }

  postContacts(body: ContactUs): Observable<ContactUs> {
    return this.httpClient.post<ContactUs>(
      `${environment.api_url}contactUs`,
      body
    );
  }

  deleteContact(id: string): Observable<ContactUs> {
    return this.httpClient.delete<ContactUs>(
      `${environment.api_url}contactUs/${id}`
    );
  }
}
