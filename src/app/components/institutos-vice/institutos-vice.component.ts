import { Component, OnInit } from '@angular/core';
import { ProfesorService } from 'src/app/services/profesor.service';
import { InstitutoService } from 'src/app/services/instituto.service';
import { Instituto } from 'src/app/models/instituto.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
declare var $: any;
@Component({
  selector: 'app-institutos-vice',
  templateUrl: './institutos-vice.component.html',
  styleUrls: ['./institutos-vice.component.css']
})
export class InstitutosViceComponent implements OnInit {
  institutos:any;
  institutoActual:Instituto;
  idInstituto:number;
  numCarByInst:any;
  constructor(private profesorService: ProfesorService,private institutoService:InstitutoService) 
  {
    this.institutoActual=new Instituto();
    this.idInstituto=0;
  }

  ngOnInit(): void 
  {
    this.profesorService.listInstitutos().subscribe((resInstitutos: any) => {
      this.institutos = resInstitutos;
		  this.institutoActual = this.institutos[1].idInstituto;
      

    },
      err => console.error(err)
    );
  }
  modificarInstituto(i:any)
  {
    $('#modificarInstituto').modal({ dismissible: false });
		$('#modificarInstituto').modal('open');
		//console.log(this.institutos[i]);
		this.institutoActual=this.institutos[i];
  }
  altaModificarInstituto()
  {
    console.log("YA modificado",this.institutoActual);
    this.institutoService.modificarInstituto(this.institutoActual,this.institutoActual.idInstituto).subscribe((resProfesores: any) => {
		},
			err => console.error(err)
		);
  }
  eliminarInstituto(i:any)
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
        this.idInstituto=this.institutos[i].idInstituto;
        //console.log(this.idInstituto);
        this.profesorService.listCarreraByInstituto(this.idInstituto).subscribe((resCarreras: any) => {
          //console.log("Profesor modificado")
          this.numCarByInst=resCarreras.length;
          //Si el instituto no tiene carreras se elimina
          if(this.numCarByInst==0)
          {
            this.institutoService.eliminarInstituto(this.idInstituto).subscribe((resInstitutos: any) => {
              //console.log("Profesor modificado")
              Swal.fire({
                position: "center",
                icon: "success",
                title: `Instituto Eliminado`,
                });
              document.location.reload();
             
            },
              err => console.error(err)
            );
          }
          //Si no mandara alerta
          else
          {
            Swal.fire({
              position: "center",
              icon: "error",
              title: `El instituto tiene carreras`,
              });
          }
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
