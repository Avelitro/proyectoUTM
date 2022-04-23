import { Component, OnInit } from '@angular/core';
import { ProfesorService } from 'src/app/services/profesor.service';
import {Profesor} from '../../models/profesor.model';
import { TipoProfesorService } from 'src/app/services/tipo-profesor.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.css']
})
export class ProfesoresComponent implements OnInit 
{
	institutos:any;
	carreras:any;
	profesores:any;
	profe:any;
	tipoPProfesor:any;
	//profesor:Profesor;
	institutoActual:any;
	carreraActual:any;
	profesorActual:Profesor;
	numCarByInst:any;
	idProfesor:number;
	constructor(private profesorService: ProfesorService,private tipoProfesor:TipoProfesorService,private router: Router) 
	{
		//this.profesor=new Profesor();
		this.profesorActual=new Profesor();
		this.idProfesor=0;
	}
  ngOnInit(): void 
  {
	this.profesorService.listInstitutos().subscribe((resInstitutos: any) => {
		//console.log(resInstitutos);
		this.institutos = resInstitutos;
		this.institutoActual = this.institutos[1].idInstituto;
		this.profesorService.listCarreraByInstituto(this.institutoActual).subscribe((resCarreras: any) => {
			//console.log(resCarreras);
			this.carreraActual=resCarreras[0].idCarrera
			this.numCarByInst=resCarreras.length;
			this.carreras = resCarreras;
			this.profesorService.listProfesoresByCarrera(this.carreraActual).subscribe((resProfesores: any) => {
				console.log(resProfesores);
				this.profesores = resProfesores;
			},
				err => console.error(err)
			);
		},
			err => console.error(err)
		);
	},
		err => console.error(err)
	);
	this.tipoProfesor.listTipoProfesor().subscribe((resTipoProfesor: any) => {
		this.tipoPProfesor=resTipoProfesor;
		//this.tipoProfesorActual=resTipoProfesor[0].idTipoProfesor;
	},
		err => console.error(err)
	);
  }

  cambioInstituto(op: any) 
	{
		//console.log('Entro ', op.value)
		this.institutoActual = op.value;
		this.profesorService.listCarreraByInstituto(this.institutoActual).subscribe((resCarreras: any) => {
			//console.log(resCarreras);
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
	modificarProfesor(i:any)
	{
		$('#modificarProfesor').modal({ dismissible: false });
		$('#modificarProfesor').modal('open');
		console.log(this.profesores[i]);
		this.profesorActual=this.profesores[i];
	}
	altaModificarProfesor()
	{
		console.log("YA modificado",this.profesorActual);
		this.profesorService.modificarProfesor(this.profesorActual,this.profesorActual.idProfesor).subscribe((resProfesores: any) => {
			//console.log("Profesor modificado")
		},
			err => console.error(err)
		);
	}
	eliminarProfesor(i:any)
	{
		Swal.fire({
			title: '¿Estas seguro de querer eliminar?',
			position: 'center',
			icon: 'question',
			showDenyButton: true,
			showConfirmButton: true,
			confirmButtonText: 'Sí'
		  })
		  .then(respuesta => {
			if (respuesta.isConfirmed)
			{
			  console.log('dijo que sí')
			  console.log(this.profesores[i].idProfesor);
			  this.idProfesor=this.profesores[i].idProfesor;
			  this.profesorService.eliminarProfesor(this.idProfesor).subscribe((resProfesores: any) => {
				//console.log("Profesor modificado")
				document.location.reload();
			},
				err => console.error(err)
			);
			} 
			else if(respuesta.isDenied) 
			{
			  //console.log('dijo que no')
			}
		  })
	}

}

