import { Router } from 'express';
import { profesoresController } from '../controllers/profesoresController';
class ProfesoresRoutes
{
    public router: Router=Router();
    constructor()
    {
        this.config();
    }
    config() : void
    {
        this.router.get('/', profesoresController.list );
        this.router.get('/:idProfesor', profesoresController.listOne );
        this.router.post('/create', profesoresController.create);
        this.router.post('/actualizarContrasena/:idProfesor',profesoresController.actualizarContrasena);
		this.router.put('/actualizar/:idProfesor',profesoresController.actualizar);
		this.router.delete('/eliminar/:idProfesor',profesoresController.eliminar);
        this.router.get('/listAutorByArticulo/:idArticulo', profesoresController.listAutorByArticulo);
        this.router.get('/listProfesoresByInstituto/:idInstituto',profesoresController.listProfesoresByInstituto)
        this.router.get('/listProfesoresByCarrera/:idCarrera',profesoresController.listProfesoresByCarrera);
        this.router.post('/existe', profesoresController.existe);
        
        
    }
}
const profesoresRoutes= new ProfesoresRoutes();
export default profesoresRoutes.router;