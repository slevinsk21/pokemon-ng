import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonServiceService {
  
  constructor(private http: HttpClient) { }

  async getList(params) {
    return await this.http.get(BASE_URL, { params }).toPromise();
  }

  async getListDetails(url) {
    return await this.http.get(url).toPromise();
}
}