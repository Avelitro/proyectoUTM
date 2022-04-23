import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; /* para hacer las peticiones*/
import { environment } from '../../environments/environment'; /*para conectar el server con la ruta que tiene*/
import { Carrera } from 'src/app/models/carrera.model';

@Injectable({
  providedIn: 'root'
})
export class CarreraService {

  constructor(private http: HttpClient) { }
  listarOne(idCarrera:number)
  {
    return this.http.get(`${environment.API_URI}/Carreras/listarOne/${idCarrera}`);
  }
  listCarreras()
	{
		return this.http.get(`${environment.API_URI}/Carreras/`);
	}
  modificarCarrera(carrera:Carrera,idCarrera:number)
	{
		return this.http.put(`${environment.API_URI}/Carreras/actualizar/${idCarrera}`,carrera);
	}
  eliminarCarrera(idCarrera:number)
	{
		return this.http.delete(`${environment.API_URI}/Carreras/eliminar/${idCarrera}`);
	}
  guardarCarrera(carrera:Carrera)
  {
    return this.http.post(`${environment.API_URI}/Carreras/create`, carrera);
  }
}
