export class Profesor{
    idProfesor:number;
    nombresP: string;
    apellidoP: string;
    apellidoM: string;
    correoProfesor: string;
    password: string;
    nivel: number;
    idCarrera: number;
    grado: string;
    idTipoProfesor: number;
    nombreApa:string;
    idInstituto:number;
    constructor() {
        this.idProfesor= 0;
        this.nombresP = 'Jose Abel';
        this.apellidoP = 'Martinez';
        this.apellidoM = 'Leyva';
        this.correoProfesor = 'joseabelmartinezleyva@gmail.com';
        this.password = '12345';
        this.nivel = 4;
        this.idCarrera = 2;
        this.grado = 'Ing';
        this.idTipoProfesor = 1;
        this.nombreApa='Cruz, A';
        this.idInstituto=2;
    }
}