import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profesor } from 'src/app/models/profesor.model';
import { ProfesorService } from 'src/app/services/profesor.service';
import {InstitutoService} from 'src/app/services/instituto.service';
import {CarreraService} from 'src/app/services/carrera.service'
import { Carrera } from 'src/app/models/carrera.model';
import {Instituto} from 'src/app/models/instituto.model'
declare var $:any;
@Component({
	selector: 'app-generales',
	templateUrl: './generales.component.html',
	styleUrls: ['./generales.component.css']
})
export class GeneralesComponent implements OnInit {
	idProfesor : number = 0; 
	profesor: Profesor;
	instituto:any;
	carrera:any;
	institutos:any;
	carreras:any;
	//profesor:Profesor;
	institutoActual:any;
  	institutoM:Instituto;
	carreraActual:any;
  	carreraActual2:Carrera;
	numCarByInst:any;
  	idCarrera:number;

	constructor(private route:ActivatedRoute, private profesorService:ProfesorService,private institutosService:InstitutoService,private carrerasService:CarreraService) { 
			this.profesor=new Profesor();
			this.carreraActual2=new Carrera();
			this.institutoM=new Instituto();
			this.idCarrera=0;
		}

	ngOnInit(): void 
	{
		this.route.paramMap.subscribe(params =>
			{
				this.idProfesor = Number(params.get('idProfesor'));
				this.idProfesor=Number(localStorage.getItem('idProfesor'));
				this.profesorService.listOne(this.idProfesor).subscribe((resProfesor: any) =>
				{
					this.profesor=resProfesor;
					console.log(resProfesor);
					console.log("Este es generales",this.profesor);
					this.institutosService.listarOne(this.profesor.idInstituto).subscribe((resInstituto: any) =>
					{
						this.instituto=resInstituto.nombreInstituto;
						this.carrerasService.listarOne(this.profesor.idCarrera).subscribe((resCarrera: any) =>
						{
							this.carrera=resCarrera.nombreCarrera
						},
						err => console.error(err)
						); 
					},
					err => console.error(err)
					); 
				},
				err => console.error(err)
				);
			});
			this.profesorService.listInstitutos().subscribe((resInstitutos: any) => {
				//console.log(resInstitutos);
				this.institutos = resInstitutos;
				this.institutoM=resInstitutos;
				this.institutoActual = this.institutos[1].idInstituto;
				this.profesorService.listCarreraByInstituto(this.profesor.idInstituto).subscribe((resCarreras: any) => {
				  //console.log(resCarreras);
				  this.carreras = resCarreras;
				  this.carreraActual=resCarreras[0].idCarrera
				  this.numCarByInst=resCarreras.length;
				  
				},
				  err => console.error(err)
				);
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
			//this.cambioCarrera(dato);
			}
		},
		err => console.error(err)
		);
	}
	modificarProfesor()
	{
		//console.log(this.profesor)
		this.profesorService.modificarProfesor(this.profesor,this.profesor.idProfesor).subscribe((resProfesores: any) => {
			//console.log("Profesor modificado")
			document.location.reload();
		},
			err => console.error(err)
		);
	}


}
