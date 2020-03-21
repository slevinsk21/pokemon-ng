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
  image: string = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'
  constructor(private  requester: PokemonServiceService,
    private router: Router) { }

  ngOnInit() {
    if (this.requester.pokemonSelected) {
      this.pokemon = this.requester.pokemonSelected;
    }  /*else this.goBack(); */
  }
  goBack() {
    this.router.navigate(['/']);
  }

}
