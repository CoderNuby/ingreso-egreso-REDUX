import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
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

    delete ingresoEgreso.uid;

    return this.firestore.doc(`${ID_USUARIO}/ingresos-egresos`).collection('items').add({
      descripcion: ingresoEgreso.descripcion,
      monto: ingresoEgreso.monto,
      tipo: ingresoEgreso.tipo
    });
  }

  initIngresoEgresoListener(uid: string){
    return this.firestore.collection(`${uid}/ingresos-egresos/items`).snapshotChanges().pipe(map(snapshot => {
      return snapshot.map(doc => {
        const datos: any = doc.payload.doc.data();
        return {
          uid: doc.payload.doc.id,
          ...datos
        }
      });
    }));
  }

  borrarIngresoEgreso(IdItem: string) {
    const ID_USUARIO = this.authService.usuario.id;
    return this.firestore.doc(`${ID_USUARIO}/ingresos-egresos/items/${IdItem}`).delete();
  }
}
