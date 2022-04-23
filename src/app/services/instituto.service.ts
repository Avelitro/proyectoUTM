import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; /* para hacer las peticiones*/
import { environment } from '../../environments/environment'; /*para conectar el server con la ruta que tiene*/
import { headers } from '../models/Header';
import { Instituto } from 'src/app/models/instituto.model';

@Injectable({
  providedIn: 'root'
})
export class InstitutoService {

  constructor(private http: HttpClient) { }
  listarOne(idInstituto:number)
  {
    return this.http.get(`${environment.API_URI}/Institutos/listarOne/${idInstituto}`);
  }
  modificarInstituto(instituto:Instituto,idInstituto:number)
	{
		return this.http.put(`${environment.API_URI}/Institutos/actualizar/${idInstituto}`,instituto);
	}
  eliminarInstituto(idProfesor:number)
	{
		return this.http.delete(`${environment.API_URI}/Institutos/eliminar/${idProfesor}`);
	}
  articulosByInstituto(idInstituto:number)
  {
    return this.http.get(`${environment.API_URI}/Institutos/articulosByInstituto/${idInstituto}`);
  }
  guardarInstituto(instituto:Instituto)
  {
    return this.http.post(`${environment.API_URI}/Institutos/create`, instituto);
  }
}
