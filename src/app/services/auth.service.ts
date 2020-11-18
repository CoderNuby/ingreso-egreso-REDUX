import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { map } from 'rxjs/operators';


import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore
  ) { }

  initAuthListener() {
    this.auth.authState.subscribe((usuario) => {
      if(usuario){
        console.log(usuario);
        console.log(usuario.uid);
        console.log(usuario.email);
      }
    });
  }

  crearUsuario(usuario: Usuario) {
    return this.auth.createUserWithEmailAndPassword(usuario.email, usuario.password).then(({user}) => {
      const usuarioNuevo = new Usuario(user.uid, usuario.nombre, user.email);

      return this.firestore.doc(`${usuarioNuevo.id}/usuario`).set({
        id: usuarioNuevo.id,
        nombre: usuarioNuevo.nombre,
        email: usuarioNuevo.email
      });
    });
  }

  loginUsuario(usuario: Usuario){
    return this.auth.signInWithEmailAndPassword(usuario.email, usuario.password);
  }
  
  logOut(){
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(map(usuario => usuario != null));
  }
}
