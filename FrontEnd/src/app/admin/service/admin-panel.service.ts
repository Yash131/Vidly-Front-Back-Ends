import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminPanelService {

  constructor(private httpClient : HttpClient) { }

  siteAnalytics(){
    return this.httpClient.get(`${environment.api_url}admin_panel/basic_infos`)
  }

  movieQuantityGraph(){
    return this.httpClient.get(`${environment.api_url}admin_panel/moviequantity_data`)
  }
}
