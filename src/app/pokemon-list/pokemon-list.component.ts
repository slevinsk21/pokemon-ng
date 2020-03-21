import { Component, OnInit } from '@angular/core';
import { PokemonServiceService } from '../services/pokemon-service.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.sass']
})
export class PokemonListComponent implements OnInit {
  list: Array<any> = [];
  detailList: Array<any> = [];
  constructor(private  requester: PokemonServiceService) {
  }

  ngOnInit() {
    const cacheList = JSON.parse(localStorage.getItem('list'))
    this.list = localStorage.length > 0 && cacheList ? cacheList : this.listPokemon()
  }
  
  async listPokemon() {
    console.log( 'Getting Data...' );
    const params = { limit: 25 };
    
    try {
      const { results } = await this.requester.getList(params);

      let data = []
      data = results.map(item => this.requester.getListDetails(item.url));
      data = await Promise.all(data);
      localStorage.setItem('list', JSON.stringify(data));
      this.list = data;

    } catch (error) {
      console.log(error);
    } finally {
      console.log( 'Getting All Data --DONE--' );
    }
  }
}
