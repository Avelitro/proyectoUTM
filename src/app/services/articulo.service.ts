import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; /* para hacer las peticiones*/
import { environment } from '../../environments/environment'; /*para conectar el server con la ruta que tiene*/


@Injectable({
	providedIn: 'root'
})
export class ArticuloService 
{
	constructor(private http: HttpClient) { }
	listByProfesor(idProfesor: number) {
		return this.http.get(`${environment.API_URI}/Articulo/listByProfesor/${idProfesor}`);
	}
	listByPeriodoByProfesor(ini:any,fin:any,idProfesor:number){
		console.log(ini,fin,idProfesor)
		return this.http.get(`${environment.API_URI}/articulo/listByPeriodo/${ini}/${fin}/${idProfesor}`);
	}
	create(articulo:any,idProfesor:number){
		return this.http.post(`${environment.API_URI}/Articulo/create/${idProfesor}`,articulo);
	}
	eliminarAutorByArticulo(idProfesor:number,idArticulo:number)
	{
		return this.http.delete(`${environment.API_URI}/Articulo/eliminarAutorByArticulo/${idProfesor}/${idArticulo}`);
	}
}
