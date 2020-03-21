import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { AppRoutingModule } from './app-routing.module';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    PokemonListComponent
  ],
  imports: [
    BrowserModule , AppRoutingModule , HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
