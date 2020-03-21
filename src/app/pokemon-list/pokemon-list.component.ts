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
    console.log('EN LA API');
    const params = { limit: 25 };
    
    try {
      const { results } = await this.requester.getList(params);

      const data = [];
      results.map(item => {
        data.push(this.requester.getListDetails(item.url))
        // const detail = await this.requester.getListDetails(item.url)
      });

      // console.log(await Promise.all(data));

      localStorage.setItem('list', JSON.stringify(await Promise.all(data)))
    } catch (error) {
      console.log(error);
    }
  }
}
