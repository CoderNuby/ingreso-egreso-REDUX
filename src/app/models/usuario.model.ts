export class Usuario {

    constructor(
        nombre?: string,
        email?: string,
        uid?: string
    ) {
        this.nombre = nombre;
        this.email = email;
        this.id = uid;
        this.password = null;
    }

    id: string
    nombre: string;
    email: string;
    password: string;
}