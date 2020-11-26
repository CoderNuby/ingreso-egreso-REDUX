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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  
  formulario: FormGroup;

  usuario: Usuario;

  cargando: boolean;


  uiSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      nombre: [ '', Validators.required ],
      email: [ '', [Validators.required, Validators.email] ],
      password: [ '', Validators.required ]
    });

    this.uiSubscription = this.store.select('ui').subscribe((ui) => {
      this.cargando = ui.isLoading;
    });
  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }

  registrarUsuario() {
    if(this.formulario.valid) {
      this.guardarUsuario();
    }else {
      console.log("Formulario invalido!!");
    }
  }

  private guardarUsuario() {

    this.store.dispatch(ui.isLoading());

    this.guardarDataUsuario();
    this.authService.crearUsuario(this.usuario).then((credenciales) => {
      console.log(credenciales);

      this.store.dispatch(ui.stopLoading());

      this.router.navigate(['/']);
    }).catch((error) => {
      console.error(error);
      this.store.dispatch(ui.stopLoading());
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,      
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      })
    });;
  }

  private guardarDataUsuario() {
    this.usuario = new Usuario();
    this.usuario.nombre = this.formulario.value.nombre;
    this.usuario.email = this.formulario.value.email;
    this.usuario.password = this.formulario.value.password;
  }
}
