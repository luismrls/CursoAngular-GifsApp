import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'yeoEV7egIS0FuWIeXh50VoqhMaxOSDX8';
  private _historia: string[] = [];
  public resultados: any[] = [];

  constructor(private http: HttpClient) {}

  get historial(): string[] {
    return [...this._historia];
  }

  buscarGifs(query: string) {
    
    query = query.trim().toLocaleLowerCase()
    
    if (!this._historia.includes(query)) {
      this._historia.unshift(query);
      this._historia = this._historia.splice(0,10);
    }

    this.http.get(`http://api.giphy.com/v1/gifs/search?api_key=yeoEV7egIS0FuWIeXh50VoqhMaxOSDX8&q=${ query }&limit=10`)
      .subscribe((response: any) => {
        console.log( response )
        this.resultados = response.data;
      });
    console.log(this._historia)
  }
}
