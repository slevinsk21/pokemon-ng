import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { PokemonListComponent } from './pokemon/list/pokemon-list.component';
import { PokemonDetailComponent } from './pokemon/detail/pokemon-detail.component';

const routes: Routes = [
  { path: '', component: PokemonListComponent },
  { path: 'detail', component: PokemonDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
