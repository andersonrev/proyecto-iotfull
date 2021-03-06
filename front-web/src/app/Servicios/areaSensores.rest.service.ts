import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AreaSensoresRestService{

  url = environment.url + '/areaSensor';
  constructor(private readonly _httpClient: HttpClient) {

  }

  buscar(busqueda: string): Observable<any> {
    let consulta = '';
    if (busqueda) {
      consulta = '?' + busqueda;
    }
    const urlBuscar = this.url + consulta;
    return this._httpClient
      .get(
        urlBuscar
      );
  }

  editar(id: number, datos): Observable<any>{
    const urlEditar = this.url + '/' +id;
    return this._httpClient
      .put(
        urlEditar,
        datos
      );
  }

}
