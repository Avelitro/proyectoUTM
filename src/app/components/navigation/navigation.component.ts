import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticuloService } from 'src/app/services/articulo.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import { TipoProfesorService } from 'src/app/services/tipo-profesor.service';
import { InstitutoService } from 'src/app/services/instituto.service';
import { CarreraService } from 'src/app/services/carrera.service';
import { Articulo } from '../../models/articulo.model';
import { Instituto } from 'src/app/models/instituto.model';
import { Carrera } from 'src/app/models/carrera.model';
import {Profesor} from '../../models/profesor.model';

declare var $: any;

@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
	profesor:Profesor;
	instituto:Instituto;
	carrera:Carrera;
	tipoCLR: any[] = ['Revista', 'Congreso', 'Libro'];
	institutos: any;
	institutoActual: any;
	carreras: any;
	carrerasPProf:any;
	tipoPProfesor:any;
	numCarByInst:any; 
	profesores:any;
	carreraActual:any;
	carreraActual2:any;
	tipoProfesorActual:any;
	fecha:any;
	idProfesor:any;
	nivel:number;
	//idProfesor: number = 0;
	constructor(private carreraService:CarreraService,private router: Router,private profesorService: ProfesorService,private tipoProfesor:TipoProfesorService,private institutoService:InstitutoService) 
	{
		this.profesor=new Profesor();
		this.instituto=new Instituto();
		this.carrera=new Carrera();
		let hoy=new Date();
		this.nivel=0;
		console.log(hoy);
		this.fecha=hoy.getFullYear()+'-'+(((hoy.getMonth()+1)<10)?'0'+(hoy.getMonth()+1):(hoy.getMonth()+1))+'-'+(((hoy.getDate())<10)?'0'+(hoy.getDate()):(hoy.getDate()));
		this.idProfesor=Number (localStorage.getItem('idProfesor'));
		console.log(this.profesor);
	}

	ngOnInit(): void 
	{
		this.idProfesor=Number(localStorage.getItem('idProfesor'));
		console.log(this.idProfesor);
		$(document).ready(function () {
			$('.sidenav').sidenav();
			$(".dropdown-trigger").dropdown({ coverTrigger: false });
		});
		$(document).ready(function () {
			$('.fixed-action-btn').floatingActionButton({
				direction: 'left',
				hoverEnabled: false
			});
			$('select').formSelect();
		});
		this.nivel=Number(localStorage.getItem('nivel'));
		this.profesorService.listInstitutos().subscribe((resInstitutos: any) => {
			console.log(resInstitutos);
			this.institutos = resInstitutos;
			this.institutoActual = this.institutos[1].idInstituto;
			this.profesorService.listCarreraByInstituto(this.institutoActual).subscribe((resCarreras: any) => {
				console.log(resCarreras);
				this.carreraActual=resCarreras[0].idCarrera
				this.numCarByInst=resCarreras.length;
				this.carreras = resCarreras;
			},
				err => console.error(err)
			);
		},
			err => console.error(err)
		);
		this.tipoProfesor.listTipoProfesor().subscribe((resTipoProfesor: any) => {
			this.tipoPProfesor=resTipoProfesor;
			this.tipoProfesorActual=resTipoProfesor[0].idTipoProfesor;
		},
			err => console.error(err)
		);
	}
	logout(){
		console.log('logout');
		localStorage.removeItem('token');
		localStorage.removeItem('correo');
		localStorage.removeItem('idProfesor');
		this.router.navigateByUrl('/');

	}

	cambioInstituto(op: any) 
	{
		console.log('Entro ', op.value)
		this.institutoActual = op.value;
		this.profesorService.listCarreraByInstituto(this.institutoActual).subscribe((resCarreras: any) => {
			console.log(resCarreras);
			this.numCarByInst=resCarreras.length;
			if(this.numCarByInst==0)
			{
				this.carreraActual=0
			}
			else
			{
				this.carreraActual = resCarreras[0].idCarrera;
				this.carreras = resCarreras;
				let dato = 
				{
					'value': this.carreraActual
				}
			this.cambioCarrera(dato);
			}
		},
		err => console.error(err)
		);
	}

	cambioCarrera(op: any) {
		this.carreraActual = op.value;
		this.profesorService.listProfesoresByCarrera(this.carreraActual).subscribe((resProfesores: any) => {
			console.log(resProfesores);
			this.profesores = resProfesores;
		},
			err => console.error(err)
		);
	}
	darAltaProfesor()
	{
		this.profesor.idCarrera=this.carreraActual;
		this.profesor.idInstituto=this.institutoActual;
		this.profesorService.guardarProfesor(this.profesor).subscribe((resProfesores: any) => {
		},
			err => console.error(err)
		);
		
	}
	agregarProfesor()
	{
		$('#agregarProfesor').modal({ dismissible: false });
		$('#agregarProfesor').modal('open');
	}
	agregarInstituto()
	{
		$('#agregarInstituto').modal({ dismissible: false });
		$('#agregarInstituto').modal('open');
	}
	agregarCarrera()
	{
		$('#agregarCarrera').modal({ dismissible: false });
		$('#agregarCarrera').modal('open');
	}
	darAltaInstituto()
	{
		console.log(this.instituto);
		this.institutoService.guardarInstituto(this.instituto).subscribe((resInstitutos: any) => {
			document.location.reload();
		},
			err => console.error(err)
		);
	}
	darAltaCarrera()
	{
		console.log(this.carrera);
		this.carreraService.guardarCarrera(this.carrera).subscribe((resCarrera: any) => {
			document.location.reload();
		},
			err => console.error(err)
		);
	}
}
