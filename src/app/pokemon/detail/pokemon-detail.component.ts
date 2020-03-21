import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonServiceService } from '../../services/pokemon-service.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.sass']
})
export class PokemonDetailComponent implements OnInit {
  pokemon: Object;
  image: string = null;
  evolutions: Array<any> = [];
  constructor(private  requester: PokemonServiceService,
    private router: Router) { }

  async ngOnInit() {
    if (this.requester.pokemonSelected) {
      this.pokemon = this.requester.pokemonSelected;
      this.image = this.pokemon['sprites'].front_default;
      await this.getEvoluctions();

    }  else this.goBack();
  }
  goBack() {
    this.router.navigate(['/']);
  }

  async goTo(name: string) {
    const cacheList = await JSON.parse(localStorage.getItem('list'));
    const pokemon = cacheList.find((key: Object) => key['name'] === name);
    this.requester.pokemonSelected = Object.assign({}, pokemon);
    window.scrollTo(0, 0);
    this.evolutions = [];
    this.ngOnInit();
  }

  async getEvoluctions() {
    const response = await this.requester.getEvolutionInfo(this.pokemon['species'].url);
    const evolution = await this.requester.getEvolutionInfo(response['evolution_chain'].url);
    this.evolutions.push({ name: evolution['chain'].species.name });
    this.getEvolutionFor(evolution['chain'].evolves_to);
  }

  getEvolutionFor(pokemon) {
    if (pokemon.length > 0) {
        this.evolutions.push({ name: pokemon[0].species.name });
        return this.getEvolutionFor(pokemon[0].evolves_to);
    } else
      return pokemon;
  }
}
