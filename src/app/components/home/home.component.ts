import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ArticuloService } from 'src/app/services/articulo.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import { Articulo } from '../../models/articulo.model';

declare var $: any;
@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	articulito: Articulo;
	fecha:any;
	idProfesor:any;
	fechaAnyo:any;
	tipoCLR: any[] = ['Revista', 'Congreso', 'Libro'];
	indexada:any[]=['Si','No'];
	location:any;
	constructor(private articuloService: ArticuloService) {
		this.location =location.href;
		this.articulito = new Articulo();
		let hoy=new Date();
		console.log(hoy);
		this.fecha=hoy.getFullYear()+'-'+(((hoy.getMonth()+1)<10)?'0'+(hoy.getMonth()+1):(hoy.getMonth()+1))+'-'+(((hoy.getDate())<10)?'0'+(hoy.getDate()):(hoy.getDate()));
		this.idProfesor=Number (localStorage.getItem('idProfesor'));
		console.log(this.articulito)
		this.fechaAnyo=hoy.getFullYear();
	}

	ngOnInit(): void 
	{
		$(document).ready(function () {
			$('.fixed-action-btn').floatingActionButton({
				direction: 'left',
				hoverEnabled: false
			});
			$('select').formSelect();
		});
	}
	cambioFecha()
	{
		this.fecha=$('#nuevaFecha').val();
		console.log(this.fecha)
	}
	agregarArticulo() {

		console.log("agregarArticulo");
		$('#agregarArticulo').modal({ dismissible: false });
		$('#agregarArticulo').modal('open');
	}
	darAltaArticulo() {
		this.articulito.anyo=this.fechaAnyo;
		this.articulito.fechaEdicion=this.fecha;
		console.log(this.articulito)
		this.articuloService.create(this.articulito,this.idProfesor).subscribe((resProfesor: any) => {
			console.log(resProfesor);
			if(this.location=='http://localhost:4200/home/articulos/'+this.idProfesor)
			{
				document.location.reload();
			}
	
		},
			err => console.error(err))
	}
}
