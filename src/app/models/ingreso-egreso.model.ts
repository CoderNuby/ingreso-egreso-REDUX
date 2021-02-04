export class IngresoEgreso {
    constructor(descripcion: string, monto: number, tipo: string, id?: string) {
        this.descripcion = descripcion;
        this.monto = monto;
        this.tipo = tipo;
        this.uid = id;
    }

    descripcion: string;
    monto: number;
    tipo: string;
    uid: string = null;
}