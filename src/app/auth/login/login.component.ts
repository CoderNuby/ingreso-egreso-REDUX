import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import * as ui from 'src/app/shared/ui.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginFormulario: FormGroup;

  usuario: Usuario;
  
  cargando: boolean = false;

  uiSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {

    this.loginFormulario = this.formBuilder.group({
      email: [ '', [Validators.required , Validators.email]],
      password: [ '', Validators.required]
    });

    this.uiSubscription = this.store.select('ui').subscribe((ui) => {
      this.cargando = ui.isLoading;

    });
  }

  ngOnDestroy(){
    this.uiSubscription.unsubscribe();
  }

  loginUsuario(){

    this.store.dispatch(ui.isLoading());

    this.guardarDataUsuario();
    this.authService.loginUsuario(this.usuario).then((res) => {

      this.store.dispatch(ui.stopLoading());

      this.router.navigate(['/']);
    }).catch((error) => {
      this.store.dispatch(ui.stopLoading());
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,      
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500
      });
    });
  }

  private guardarDataUsuario() {
    this.usuario = new Usuario();
    this.usuario.nombre = this.loginFormulario.value.nombre;
    this.usuario.email = this.loginFormulario.value.email;
    this.usuario.password = this.loginFormulario.value.password;
  }
}
