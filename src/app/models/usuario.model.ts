export class Usuario {

    constructor(
        uid?: string,
        nombre?: string,
        email?: string
    ) {
        this.id = uid;
        this.nombre = nombre;
        this.email = email;
        this.password = null;
    }

    id: string
    nombre: string;
    email: string;
    password: string;
}