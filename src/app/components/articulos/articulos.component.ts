import { Component, OnInit } from '@angular/core';
import { ArticuloService } from 'src/app/services/articulo.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
declare var $:any;
@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css', '../../../styles.css']
})
export class ArticulosComponent implements OnInit {
  articulos: any;
	autores:any =[];
	ini:any;
	fin:any;
	idProfesor : number = 0;
	idArticulo:number=0;
	fileToUpload:any;
  constructor(private articuloService: ArticuloService, private profesorService:ProfesorService,private route:ActivatedRoute) 
  {
	  this.fileToUpload=null;

    let hoy=new Date();
		console.log(hoy);
		this.ini=(hoy.getFullYear()-3)+'-01-01';
		this.fin=hoy.getFullYear()+'-'+(((hoy.getMonth()+1)<10)?'0'+(hoy.getMonth()+1):(hoy.getMonth()+1))+'-'+(((hoy.getDate())<10)?'0'+(hoy.getDate()):(hoy.getDate()));
		console.log(this.ini);
  }

  ngOnInit(): void 
  {
		this.route.paramMap.subscribe(params =>
			{
				this.idProfesor = Number(params.get('idProfesor'));        
			});
		console.log("Iniciado componente",this.idProfesor)
		this.articuloService.listByPeriodoByProfesor(this.ini,this.fin,this.idProfesor).subscribe((resArticulos: any) => 
		{
			console.log("Saliendo a servicio");
			
			this.articulos = resArticulos;
			this.articulos.forEach((element:any) => {
				this.profesorService.listAutorByArticulo(element.idArticulo).subscribe((resAutores: any) => 
				{
					this.autores.push(resAutores);
				},
				err => console.error(err));
			});
			
		},
			err => console.error(err)
			
		);console.log("Probando tiempo")
  }
  CambioFechaIni(){
		console.log("Probando cambio ini")
		this.ini=$('#fechaIni').val();
		console.log(this.ini)
		this.articuloService.listByPeriodoByProfesor(this.ini,this.fin,this.idProfesor).subscribe((resArticulos: any) => 
		{
			console.log("Saliendo a servicio");
			
			this.articulos = resArticulos;
			this.articulos.forEach((element:any) => {
				this.profesorService.listAutorByArticulo(element.idArticulo).subscribe((resAutores: any) => 
				{
					this.autores.push(resAutores);
				},
				err => console.error(err));
			});
			
		},
			err => console.error(err)
			
		);
	}
	CambioFechaFin(){
		console.log("Probando cambio fin")
		this.fin=$('#fechaFin').val();
		console.log(this.fin)
		this.articuloService.listByPeriodoByProfesor(this.ini,this.fin,this.idProfesor).subscribe((resArticulos: any) => 
		{
			console.log("Saliendo a servicio");
			
			this.articulos = resArticulos;
			this.articulos.forEach((element:any) => {
				this.profesorService.listAutorByArticulo(element.idArticulo).subscribe((resAutores: any) => 
				{
					this.autores.push(resAutores);
				},
				err => console.error(err));
			});
			
		},
			err => console.error(err)
			
		);
	}
	eliminarAutor(op:any,op2:any)
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
				  this.idProfesor=op.idProfesor;
				  this.idArticulo=op2.idArticulo;
				  this.articuloService.eliminarAutorByArticulo(this.idProfesor,this.idArticulo).subscribe((resAutores: any) => 
				  {
					document.location.reload();
				  },
				  err => console.error(err));
			}
			else if(respuesta.isDenied) 
			{
				//console.log('dijo que no')
			}
		  })
	}	
	eleccionArchivo(files:any)
	{
		console.log("Presiono Boton")
		//Para guardar archivos seleccionados
		let archivo=files.files
		console.log(archivo)
		//fileToUpload tiene 
		//Para que solo guarde el primero archivo
		this.fileToUpload=archivo.item(0);
	}
}

//{{__dirname}}
/* blob es un tipo de dato que guarba mucha informacion
blob tiene la imagen 
split para el tipo de archivo

*/
