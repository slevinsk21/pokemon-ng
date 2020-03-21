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
  evolutions: any;
  constructor(private  requester: PokemonServiceService,
    private router: Router) { }

  async ngOnInit() {
    if (this.requester.pokemonSelected) {
      this.pokemon = this.requester.pokemonSelected;
      this.image = this.pokemon['sprites'].front_default;
      this.evolutions = await this.getEvoluctions();
    }  else this.goBack();
  }
  goBack() {
    this.router.navigate(['/']);
  }

  async getEvoluctions() {
    const response = await this.requester.getEvolutionInfo(this.pokemon['species'].url);
    const evolution = await this.requester.getEvolutionInfo(response['evolution_chain'].url);

    let data = [{ name: evolution['chain'].species.name }];
    if (evolution['chain'].evolves_to.length === 1) {
      data.push({ name: evolution['chain'].evolves_to[0].species.name });

      if (evolution['chain'].evolves_to[0].evolves_to.length === 1) data.push({ name: evolution['chain'].evolves_to[0].evolves_to[0].species.name });
    }
    return data;
  }

}
