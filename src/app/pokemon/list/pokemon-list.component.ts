import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PokemonServiceService } from '../../services/pokemon-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.sass']
})
export class PokemonListComponent implements OnInit {
  list: Array<any> = [];
  filteredData: Array<any> = [];
  query = new FormControl('');
  isLoading: boolean = false;
  error: boolean = false;

  constructor(private  requester: PokemonServiceService,
    private router: Router) {
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
    // console.log(this.isLoading);
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
      // console.log(this.isLoading);

    }
  }
  goToDetail(pokemon: Object) {
    this.requester.pokemonSelected = Object.assign({}, pokemon);
    window.scrollTo(0, 0);
    this.router.navigate(['/detail']);
  }

  trimString(s) {
    var l=0, r=s.length -1;
    while(l < s.length && s[l] == ' ') l++;
    while(r > l && s[r] == ' ') r-=1;
    return s.substring(l, r+1);
  }

  compareObjects(o1, o2) {
    var k = '';
    for(k in o1) if(o1[k] != o2[k]) return false;
    for(k in o2) if(o1[k] != o2[k]) return false;
    return true;
  }

  itemExists(haystack, needle) {
    for(var i=0; i<haystack.length; i++) if(this.compareObjects(haystack[i], needle)) return true;
    return false;
  }

  search() {
    this.filteredData = [];
      const toSearch = this.trimString(this.query.value.toLowerCase());
      for(let i= 0; i < this.list.length; i++) {
        if(this.list[i].name.indexOf(toSearch)!=-1) {
          if(!this.itemExists(this.filteredData, this.list[i])) this.filteredData.push(this.list[i]);
        }
      }
  }

  handleClear() {
    this.query.setValue('');
    this.search();
  }

  getPokemons() {
    if (this.filteredData.length > 0) return this.filteredData;
    return this.list;
  }
}
