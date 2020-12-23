import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) { }

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso){
    const ID_USUARIO = this.authService.usuario.id;
    return this.firestore.doc(`${ID_USUARIO}/ingresos-egresos`).collection('items').add({
      descripcion: ingresoEgreso.descripcion,
      monto: ingresoEgreso.monto,
      tipo: ingresoEgreso.tipo
    });
  }
}
