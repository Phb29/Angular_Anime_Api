import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"

import { Animes } from '../models/Anime.model';
import { environment } from "../environments/environment.development";


@Injectable({
  providedIn: 'root'
})
export class AnimeService {

  private url = `${environment.api}/Animes`;

  constructor(private httpClient: HttpClient){
  }

  obterAnimes(){
    return this.httpClient.get<Animes[]>(this.url);
  }

cadastrarAnime(anime: Animes) {
  anime.id = 6; // Defina o ID manualmente (substitua 1 pelo ID desejado)
  return this.httpClient.post<Animes>(this.url, anime)
   
}


  editarAnime(anime: Animes){
    return this.httpClient.put<Animes>(`${this.url}/${anime.id}`, anime);
  }

  remover(id: number){
    return this.httpClient.delete<void>(`${this.url}/${id}`);
  }

}