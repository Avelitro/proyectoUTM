import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CorreoService } from 'src/app/services/correo.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
declare var $:any;
@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.css']
})
export class RecuperarComponent implements OnInit {
  token:any;
  aux:number;
  contra1:string='';
  contra2:string='';

  constructor(private route:ActivatedRoute, private correoService:CorreoService, private router: Router) 
  {
    this.token='';
    this.aux=0;
  }
  ngOnInit(): void 
  {
    this.route.paramMap.subscribe(params =>
			{
				this.token = params.get('token');
        let dato=
        {
          'token':this.token
        }
        this.correoService.decodificarMail(dato).subscribe((resCorreo: any) =>
        {
          console.log(resCorreo);
          if(resCorreo==0)
          {
            {
              Swal.fire({
                position: "center",
                icon: "error",
                title: `Datos incorrectos`,
                });
            }
            this.router.navigateByUrl('/login');
          }
          this.aux=resCorreo.idProfesor;
          },err => console.error(err));
			});
      
  }
  contrasenaIguales()
  {
    this.contra1=$('#password1').val();
    this.contra2=$('#password2').val();
    if(this.contra1==this.contra2)
    {
      let profe=
      {
        'password':this.contra1
      }
      this.correoService.nuevaContrasena(profe,this.aux).subscribe(res => 
        {
          this.router.navigateByUrl('/login');
          {
            Swal.fire({
              position: "center",
              icon: "success",
              title: `Contraseña Cambiada`,
              });
          }
         }, err => console.error(err) );
    }
    else
    {
      {
				Swal.fire({
					position: "center",
					icon: "error",
					title: `Datos incorrectos`,
					});
			}
    }

  }
}
