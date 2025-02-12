export class Movimiento{

    constructor(
        public id:number,
        public TipoMovimiento:string,
        public fecha:string,
        public idMaterial:string,
        public nombreMaterial:string,
        public tipoMaterial:string,
        public idUbicacion:string,
        public nombreUbicacion:string
    ){};

}