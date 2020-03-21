import { Component, OnInit } from '@angular/core';
import { PokemonServiceService } from '../services/pokemon-service.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.sass']
})
export class PokemonListComponent implements OnInit {
  list: Array<any> = [];
  constructor(private  requester: PokemonServiceService) {
  }

  async ngOnInit() {
    const cacheList = await JSON.parse(localStorage.getItem('list'));
    console.log(localStorage.length > 0 && cacheList);

    if (localStorage.length > 0 && cacheList) {
      this.list = cacheList
    } else await this.listPokemon();
  }
  
  async listPokemon() {
    console.log( 'Getting Data...' );
    const params = { limit: 25 };
    
    try {
      const response = await this.requester.getList(params);
      let data: any[] = await response['results'].map(({ url }) => this.requester.getListDetails(url));
      const responseData = await Promise.all(data);
      await localStorage.setItem('list', JSON.stringify(responseData));
      this.list = responseData;

    } catch (error) {
      console.log(error);
    } finally {
      console.log( 'Getting All Data --DONE--' );
    }
  }
}
