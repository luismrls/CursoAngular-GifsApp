import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private servicioUrl: string = 'http://api.giphy.com/v1/gifs'
  private apiKey: string = 'yeoEV7egIS0FuWIeXh50VoqhMaxOSDX8';
  private _historial: string[] = [];
  public resultados: Gif[] = [];

  constructor(private http: HttpClient) {

    this._historial = JSON.parse( localStorage.getItem('historial')! ) || [];
    this.resultados = JSON.parse( localStorage.getItem('resultados')! ) || [];

  }

  get historial(): string[] {
    return [...this._historial];
  }

  buscarGifs(query: string) {
    
    query = query.trim().toLocaleLowerCase()
    
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
          .set('api_key', this.apiKey)
          .set('limit', '10')
          .set('q', query);
    
    this.http.get<SearchGifsResponse>(`${ this.servicioUrl }/search`, { params })
    .subscribe((response) => {
      this.resultados = response.data;
      localStorage.setItem('resultados', JSON.stringify( this.resultados ));
      });
  }
}
