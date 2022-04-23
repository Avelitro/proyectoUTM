import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class UsuarioService {

	constructor(private http: HttpClient) { }
	existe(profesor:any) {
		console.log("Entrando a servicio existe",profesor);
		return this.http.post(`${environment.API_URI}/profesores/existe`,profesor);
	}
}