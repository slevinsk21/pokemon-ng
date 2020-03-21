import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonServiceService {
  // private datosSource = new BehaviorSubject<any>([]);
  // public datos$ = this.datosSource.asObservable();
  public pokemonSelected: any;
  
  constructor(private http: HttpClient) { }

  async getList(params) {
    return await this.http.get(BASE_URL, { params }).toPromise();
  }

  async getListDetails(url: string) {
    return await this.http.get(url).toPromise();
}
}