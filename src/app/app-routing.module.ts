import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProfesorComponent } from './components/profesor/profesor.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { GeneralesComponent } from './components/generales/generales.component';
import { HomeComponent } from './components/home/home.component';
import { ArticulosComponent } from './components/articulos/articulos.component';
import { ArticulosViceComponent } from './components/articulos-vice/articulos-vice.component';
import { RecuperarComponent } from './components/recuperar/recuperar.component';
import { MateriasComponent } from './components/materias/materias.component';
import { ProfesoresComponent } from './components/profesores/profesores.component';
import { InstitutosViceComponent } from './components/institutos-vice/institutos-vice.component';
import { CarrerasViceComponent } from './components/carreras-vice/carreras-vice.component';

const routes: Routes = [
	{
		path: "",
		redirectTo: "/login",
		pathMatch: "full"
	},
	{
		path: 'login',
		component: LoginComponent,
	},
	{
		path: 'recuperar/:token',
		component: RecuperarComponent,
	},
	{
		path: 'home',
		component: HomeComponent,
		children: [
			{
				path: 'generales/:idProfesor',
				component: GeneralesComponent,
			},
			{
				path: 'articulos/:idProfesor', /*dos puntos es para un atributo*/ 
				component: ArticulosComponent,
			},
			{
				path: 'articulosVice',
				component: ArticulosViceComponent,
			},
			{
				path: 'materias',
				component: MateriasComponent,
			},
			{
				path: 'profesoresVice',
				component: ProfesoresComponent,
			},
			{
				path: 'institutosVice',
				component: InstitutosViceComponent,
			},
			{
				path: 'carrerasVice',
				component: CarrerasViceComponent,
			},
		]
	},
	{
		path: 'profesor',
		component: ProfesorComponent,
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
