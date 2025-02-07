export class User {
    constructor(
        public correo: string,
        public pass: string,
        public nombre: string,
        public activo: number,
        public id_rol: number
    ) { }
}