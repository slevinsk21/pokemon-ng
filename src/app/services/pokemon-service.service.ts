import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

const BASE_URL = 'https://pokeapi.co/api/v2/';

@Injectable({
  providedIn: 'root'
})
export class PokemonServiceService {
  // private datosSource = new BehaviorSubject<any>([]);
  // public datos$ = this.datosSource.asObservable();
  public pokemonSelected: any;
  
  constructor(private http: HttpClient) { }

  async getList(params) {
    return await this.http.get(`${BASE_URL}pokemon`, { params }).toPromise();
  }

  async getDetailInfo(url: string) {
    return await this.http.get(url).toPromise();
  }

  async getEvolutionInfo(url: any) {
    return await this.http.get(url).toPromise();
  }
}