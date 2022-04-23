import { Component, OnInit } from '@angular/core';
import { InstitutoService } from 'src/app/services/instituto.service';
import { ProfesorService } from 'src/app/services/profesor.service';

@Component({
	selector: 'app-articulos-vice',
	templateUrl: './articulos-vice.component.html',
	styleUrls: ['./articulos-vice.component.css']
})
export class ArticulosViceComponent implements OnInit {
	institutoActual:any;
	institutos:any;
	articulos:any;
	p:number=1;
	pageSize:number=5;
	constructor(private profesorService:ProfesorService,private institutoService:InstitutoService) { 
		
	}

	ngOnInit(): void 
	{
		this.profesorService.listInstitutos().subscribe((resInstitutos: any) => {
			//console.log(resInstitutos);
			this.institutos = resInstitutos;
			this.institutoActual = this.institutos[1].idInstituto;
			this.institutoService.articulosByInstituto(this.institutoActual).subscribe((resArticulos: any) => {
				this.articulos=resArticulos;
			  },
				err => console.error(err)
			  );
		  },
			err => console.error(err)
		  );
	}
	cambioInstituto(op: any) 
	{
		
		this.institutoActual = op.value;
		this.institutoService.articulosByInstituto(this.institutoActual).subscribe((resArticulos: any) => {
			this.articulos=resArticulos;
			console.log('Entro ', op.value)
		  },
			err => console.error(err)
		  );
	}
}
