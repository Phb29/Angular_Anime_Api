import { Component } from '@angular/core';
import { Animes } from '../models/Anime.model';
import { AnimeService } from '../services/anime.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ApiAnime';


 animes$ = new Observable<Animes[]>();

  // form
  id = '';
  anime = '';
  favorito = '';

  constructor(private animeService: AnimeService){
    this.obterAnimesCadastrados();
  }

  obterAnimesCadastrados(){
   
    this.animes$ = this.animeService.obterAnimes();
  }

  buttonClick(){
    if (!this.anime || !this.favorito)
      return;

    if (this.id) {
      this.atualizar();
      return;
    }

    this.animeService.cadastrarAnime({Anime: this.anime, Favorite: this.favorito})
      .subscribe(_ => this.obterAnimesCadastrados())
  }

  atualizar(){
    this.animeService.editarAnime({ 
      id: parseInt(this.id), Anime: this.anime, Favorite: this.favorito })
    .subscribe(_ => this.obterAnimesCadastrados());
  }

  preencherCampos(anime: Animes){
    this.id = anime.id!.toString();
    this.anime = anime.Anime;
    this.favorito = anime.Favorite;
  }

  remover(id: number){
    this.animeService.remover(id)
      .subscribe(_ => this.obterAnimesCadastrados());
  }
}
