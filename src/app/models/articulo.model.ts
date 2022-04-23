export class Articulo {
    idArticulo: number;
    tipoCLR: string
    titulo: string;
    nombreCLR: string;
    estado: string;
    fechaEdicion: string;
    tipoNI: string;
    issnisbn: string;
    volumen: string;
    paginas: string;
    //Este año por defecto
    anyo: string;
    doi: string;
    comprobante: string;
    indexa: string;
    issue: string;
    editores:  string;
    ciudad:  string;
    pais:  string;
    editorial:  string;
    constructor() {
        this.idArticulo=0;
        this.tipoCLR='Revista';
        this.titulo= 'Mi articulito';
        this.nombreCLR='Revista mexicana de computacióm';
        this.estado='Publicado';
        this.fechaEdicion='2022-03-09';
        this.tipoNI='Nacional';
        this.issnisbn='12345662';
        this.volumen='5';
        this.paginas='10-15';
        this.anyo='2022';
        this.doi='https://concepto.de/computacion/';
        this.comprobante='';
        this.indexa='Si';
        this.issue='Computación';
        this.editores=' Computación S.A';
        this.ciudad='Huajuapan';
        this.pais='México';
        this.editorial='UTM';
    }
};
