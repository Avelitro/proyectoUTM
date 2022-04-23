import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; /* para hacer las peticiones*/
import { environment } from '../../environments/environment'; /*para conectar el server con la ruta que tiene*/
import { Profesor } from '../models/profesor.model';
import { headers } from '../models/Header';

@Injectable({
	providedIn: 'root'
})
export class ProfesorService {

	constructor(private http: HttpClient) { }

	guardarProfesor(profesor: Profesor) {
		return this.http.post(`${environment.API_URI}/Profesores/create`, profesor);
	}

	listOne(idProfesor: number) {
		return this.http.get(`${environment.API_URI}/Profesores/${idProfesor}`);
	}

	listAutorByArticulo(idArticulo: number) {
		return this.http.get(`${environment.API_URI}/Profesores/listAutorByArticulo/${idArticulo}`);
	}
	listInstitutos(){
		return this.http.get(`${environment.API_URI}/Institutos/list`,{headers: headers});
	}
	listCarreraByInstituto(idInstituto:number){
		return this.http.get(`${environment.API_URI}/Carreras/getCarrerasByInstituto/${idInstituto}`);
	}
	listProfesoresByInstituto(idInstituto:number){
		return this.http.get(`${environment.API_URI}/Profesores/listProfesoresByInstituto/${idInstituto}`);

	}
	listProfesoresByCarrera(idCarrera:number){
		return this.http.get(`${environment.API_URI}/Profesores/listProfesoresByCarrera/${idCarrera}`);
	}
	listProfesores()
	{
		return this.http.get(`${environment.API_URI}/Profesores/}`); 
	}
	modificarProfesor(profesor:Profesor,idProfesor:number)
	{
		return this.http.put(`${environment.API_URI}/Profesores/actualizar/${idProfesor}`,profesor);
	}
	eliminarProfesor(idProfesor:number)
	{
		return this.http.delete(`${environment.API_URI}/Profesores/eliminar/${idProfesor}`);
	}
}
