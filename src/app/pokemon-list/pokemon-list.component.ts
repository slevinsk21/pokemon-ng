import { Component, OnInit } from '@angular/core';
import { PokemonServiceService } from '../services/pokemon-service.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.sass']
})
export class PokemonListComponent implements OnInit {
  list: Array<any> = [];
  isLoading: boolean = false;
  error: boolean = false;
  constructor(private  requester: PokemonServiceService) {
  }

  ngOnInit() {
    this.valitadeCache();
  }
  
  async listPokemon() {
    const params = { limit: 25 };
    try {
      const response = await this.requester.getList(params);
      let data: any[] = await response['results'].map(({ url }) => this.requester.getListDetails(url));
      const responseData = await Promise.all(data);
      await localStorage.setItem('list', JSON.stringify(responseData));
      this.list = responseData;
    } catch (error) {
      this.error = true;
      console.log(error);
    }
  }

  async valitadeCache() {
    this.isLoading = true;
    console.log(this.isLoading);
    try {
      const cacheList = await JSON.parse(localStorage.getItem('list'));
      if (localStorage.length > 0 && cacheList) {
        this.list = cacheList
      } else await this.listPokemon();
    } catch (error) {
      console.log(error);
      this.error = true;
    }
    finally {
      this.isLoading = false;
      console.log(this.isLoading);

    }
  }
}
