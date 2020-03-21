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
  constructor(private  requester: PokemonServiceService,
    private router: Router) { }

  ngOnInit() {
    if (this.requester.pokemonSelected) {
      this.pokemon = this.requester.pokemonSelected;
      this.image = this.pokemon['sprites'].front_default
    }  else this.goBack();
  }
  goBack() {
    this.router.navigate(['/']);
  }

}
