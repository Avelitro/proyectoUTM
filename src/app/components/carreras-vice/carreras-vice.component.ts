import { Component, OnInit } from '@angular/core';
import { ProfesorService } from 'src/app/services/profesor.service';
import { CarreraService } from 'src/app/services/carrera.service';
import { Carrera } from 'src/app/models/carrera.model';
import {Instituto} from 'src/app/models/instituto.model'
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-carreras-vice',
  templateUrl: './carreras-vice.component.html',
  styleUrls: ['./carreras-vice.component.css']
})
export class CarrerasViceComponent implements OnInit 
{
  institutos:any;
	carreras:any;
	//profesor:Profesor;
	institutoActual:any;
  institutoM:Instituto;
	carreraActual:any;
  carreraActual2:Carrera;
	numCarByInst:any;
  idCarrera:number;
  //institutoAux:any;
  constructor(private profesorService: ProfesorService,private carreraService:CarreraService) 
  {
    this.carreraActual2=new Carrera();
    this.institutoM=new Instituto();
    this.idCarrera=0;
  }

  ngOnInit(): void 
  {
    this.profesorService.listInstitutos().subscribe((resInstitutos: any) => {
      //console.log(resInstitutos);
      this.institutos = resInstitutos;
      this.institutoM=resInstitutos;
      this.institutoActual = this.institutos[1].idInstituto;
      this.profesorService.listCarreraByInstituto(this.institutoActual).subscribe((resCarreras: any) => {
        //console.log(resCarreras);
        this.carreraActual=resCarreras[0].idCarrera
        this.numCarByInst=resCarreras.length;
        this.carreras = resCarreras;
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
  modificarCarrera(i:any)
	{
		$('#modificarCarrera').modal({ dismissible: false });
		$('#modificarCarrera').modal('open');
		console.log(this.carreras[i]);
		this.carreraActual2=this.carreras[i];
    
	}
  altaModificarCarrera()
	{
		console.log("YA modificado",this.carreraActual2);
    this.carreraService.modificarCarrera(this.carreraActual2,this.carreraActual2.idCarrera).subscribe((resCarreras: any) => {
      document.location.reload();
    },
			err => console.error(err)
		);
	}
  eliminarCarrera(i:any)
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
			  	this.idCarrera=this.carreras[i].idCarrera;
			  	this.carreraService.eliminarCarrera(this.idCarrera).subscribe((resCarreras: any) => {
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
