export class IngresoEgreso {
    constructor(descripcion: string, monto: number, tipo: string, id?: string) {
        this.descripcion = descripcion;
        this.monto = monto;
        this.tipo = tipo;
        this.id = id;
    }

    descripcion: string;
    monto: number;
    tipo: string;
    id: string = null;
}