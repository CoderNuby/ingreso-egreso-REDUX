import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { map } from 'rxjs/operators';

import * as auth from 'src/app/auth/auth.actions';
import { AppState } from '../app.reducer';


import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuarioSubscrito: Subscription;

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store<AppState>
  ) { }

  initAuthListener() {
    this.auth.authState.subscribe((usuario) => {
      if(usuario){
        this.usuarioSubscrito = this.firestore.doc(`${usuario.uid}/usuario`).valueChanges().subscribe((user: any) => {
          console.log("Respuesta:: ", user);
          let newUser: Usuario = new Usuario(user.nombre, user.email, user.id);

          this.store.dispatch(auth.setUser({user: newUser}));
        });
      }else{
        this.store.dispatch(auth.unsetUser());
        this.usuarioSubscrito.unsubscribe();
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
