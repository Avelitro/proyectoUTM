import { Component, OnInit } from '@angular/core';
import { Usuario } from './../../models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Profesor } from 'src/app/models/profesor.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CorreoService } from 'src/app/services/correo.service';

declare var $:any;
@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	usuario: Usuario;
	idProfesor: number = 0;
	constructor(private usuarioService: UsuarioService, private router: Router, private correoService:CorreoService) {
		this.usuario = new Usuario();
	}

	ngOnInit(): void {
		$(document).ready(function()
		{
			$('.modal').modal({
				dismissible:true
			})
		});
	}
	logueo() {
		let profe={
			'correo':this.usuario.correo,
			'password':this.usuario.password
		  }
		this.usuarioService.existe(profe).subscribe((resUsuario: any) => {
			console.log(resUsuario);
			if (resUsuario != -1) {
				//console.log("Mirar",resUsuario[0])
				this.idProfesor = resUsuario.idProfesor;
				localStorage.setItem('token', resUsuario.token);
				localStorage.setItem('correo',resUsuario.correo);
				localStorage.setItem('idProfesor', ''+resUsuario.idProfesor);
				localStorage.setItem('nivel', ''+resUsuario.nivel);
				this.router.navigateByUrl('/home/generales/' + resUsuario.idProfesor);
			}
			else{
				Swal.fire({
					position: "center",
					icon: "error",
					title: `Datos incorrectos`,
					});
			}
		},
			err => console.error(err)
		);
	
	}
	cambiarContrasena(){
		console.log("contraseña");
		$('#cambiarContrasena').modal({ dismissible: false });
		$('#cambiarContrasena').modal('open');
	}
	cambiarContrasenya(){
		console.log('recuperar contraseña')
		this.correoService.enviarCorreoRecuperarContrasenya(this.usuario).subscribe((resUsuario: any) =>
			{
			console.log(resUsuario);
			},err => console.error(err));
	}
}
